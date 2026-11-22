import UIKit
import MapKit
import CoreLocation

final class TravelMofuMapViewController: UIViewController, CLLocationManagerDelegate, MKMapViewDelegate {

    private let mapView = MKMapView()
    private let locationManager = CLLocationManager()

    private let destinationName: String
    private let destinationCoordinate: CLLocationCoordinate2D
    private let mode: String

    private let mofu = MKPointAnnotation()
    private let destination = MKPointAnnotation()

    private var routeOverlay: MKPolyline?
    private var directions: MKDirections?
    private var mofuView: MKAnnotationView?
    private var mofuFrames: [UIImage] = []
    private var lastMovementTime = Date.distantPast
    private var movementTimer: Timer?
    private var lastCoordinate: CLLocationCoordinate2D?
    private var speechLabel: UILabel?
    private var speechHideWork: DispatchWorkItem?
    private var navigationRoute: MKRoute?
    private var announcedSteps = Set<Int>()
    private var announcedNearArrival = false
    private var announcedArrival = false

    init(name: String, coordinate: CLLocationCoordinate2D, mode: String) {
        self.destinationName = name
        self.destinationCoordinate = coordinate
        self.mode = mode
        super.init(nibName: nil, bundle: nil)
        modalPresentationStyle = .fullScreen
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground

        mapView.frame = view.bounds
        mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        mapView.delegate = self
        mapView.showsUserLocation = false
        view.addSubview(mapView)

        destination.coordinate = destinationCoordinate
        destination.title = destinationName
        mapView.addAnnotation(destination)

        loadMofuFrames()
        setupMofuSpeech()

        // MOFU MAP DIAGNOSTIC
        let diagnosticLabel = UILabel()
        diagnosticLabel.text = "モフ地図 Ver.2 / 画像: \(mofuFrames.count)コマ"
        diagnosticLabel.font = .boldSystemFont(ofSize: 13)
        diagnosticLabel.textColor = .black
        diagnosticLabel.backgroundColor = .systemYellow
        diagnosticLabel.textAlignment = .center
        diagnosticLabel.layer.cornerRadius = 8
        diagnosticLabel.clipsToBounds = true
        diagnosticLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(diagnosticLabel)

        NSLayoutConstraint.activate([
            diagnosticLabel.topAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.topAnchor,
                constant: 72
            ),
            diagnosticLabel.leadingAnchor.constraint(
                equalTo: view.leadingAnchor,
                constant: 16
            ),
            diagnosticLabel.widthAnchor.constraint(equalToConstant: 260),
            diagnosticLabel.heightAnchor.constraint(equalToConstant: 34)
        ])

        NSLog("🐾 MOFU MAP DIAGNOSTIC: frames=\(mofuFrames.count)")

        mofu.title = "モフ"
        mapView.addAnnotation(mofu)

        let close = UIButton(type: .system)
        close.setTitle("← 戻る", for: .normal)
        close.backgroundColor = .systemBackground
        close.layer.cornerRadius = 14
        close.translatesAutoresizingMaskIntoConstraints = false
        close.addTarget(self, action: #selector(closeMap), for: .touchUpInside)
        view.addSubview(close)

        NSLayoutConstraint.activate([
            close.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 12),
            close.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            close.widthAnchor.constraint(equalToConstant: 130),
            close.heightAnchor.constraint(equalToConstant: 48)
        ])

        let finish = UIButton(type: .system)
        finish.setTitle("🛑 旅を終了", for: .normal)
        finish.backgroundColor = .systemBackground
        finish.layer.cornerRadius = 14
        finish.translatesAutoresizingMaskIntoConstraints = false
        finish.addTarget(self, action: #selector(endTripFromMap), for: .touchUpInside)
        view.addSubview(finish)

        NSLayoutConstraint.activate([
            finish.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 12),
            finish.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            finish.widthAnchor.constraint(equalToConstant: 130),
            finish.heightAnchor.constraint(equalToConstant: 48)
        ])

        movementTimer = Timer.scheduledTimer(
            timeInterval: 0.5,
            target: self,
            selector: #selector(updateMofuAnimation),
            userInfo: nil,
            repeats: true
        )

        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.distanceFilter = 5

        switch locationManager.authorizationStatus {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .authorizedAlways, .authorizedWhenInUse:
            locationManager.startUpdatingLocation()
        default:
            break
        }

        let region = MKCoordinateRegion(
            center: destinationCoordinate,
            latitudinalMeters: 1200,
            longitudinalMeters: 1200
        )
        mapView.setRegion(region, animated: false)
        showMofuSpeech("さぁ、出発するぞ！")
    }

    private func setupMofuSpeech() {
        let label = UILabel()
        label.numberOfLines = 2
        label.textAlignment = .center
        label.font = .boldSystemFont(ofSize: 15)
        label.textColor = .label
        label.backgroundColor = .secondarySystemBackground
        label.layer.cornerRadius = 16
        label.layer.masksToBounds = true
        label.translatesAutoresizingMaskIntoConstraints = false
        label.isHidden = true
        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.bottomAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.bottomAnchor,
                constant: -30
            ),
            label.widthAnchor.constraint(lessThanOrEqualTo: view.widthAnchor, constant: -32),
            label.widthAnchor.constraint(greaterThanOrEqualToConstant: 170),
            label.heightAnchor.constraint(greaterThanOrEqualToConstant: 52)
        ])

        speechLabel = label
    }

    private func showMofuSpeech(_ message: String) {
        speechHideWork?.cancel()
        speechLabel?.text = "🐾 モフ「\(message)」"
        speechLabel?.isHidden = false

        let work = DispatchWorkItem { [weak self] in
            self?.speechLabel?.isHidden = true
        }
        speechHideWork = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 4, execute: work)
    }

    @objc private func closeMap() {
        locationManager.stopUpdatingLocation()
        movementTimer?.invalidate()
        movementTimer = nil
        mofuView?.image = mofuFrames.first
        directions?.cancel()
        speechHideWork?.cancel()

        dismiss(animated: true)
    }

    @objc private func endTripFromMap() {
        locationManager.stopUpdatingLocation()
        movementTimer?.invalidate()
        movementTimer = nil
        directions?.cancel()
        TravelWalkingNavigation.shared.stop()
        speechHideWork?.cancel()
        NotificationCenter.default.post(
            name: Notification.Name("TravelMofuTripEnded"),
            object: nil
        )
        dismiss(animated: true)
    }

    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        if manager.authorizationStatus == .authorizedAlways ||
           manager.authorizationStatus == .authorizedWhenInUse {
            manager.startUpdatingLocation()
        }
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last,
              location.horizontalAccuracy >= 0 else { return }

        if let previous = lastCoordinate {
            let oldLocation = CLLocation(
                latitude: previous.latitude,
                longitude: previous.longitude
            )
            let moved = location.distance(from: oldLocation)

            if moved >= 3 && location.horizontalAccuracy <= 35 {
                lastMovementTime = Date()
            }
        }

        lastCoordinate = location.coordinate
        mofu.coordinate = location.coordinate

        updateMofuGuidance(at: location)

        if routeOverlay == nil && directions == nil {
            calculateRoute(from: location.coordinate)
        }
    }

    private func calculateRoute(from coordinate: CLLocationCoordinate2D) {
        let request = MKDirections.Request()
        request.source = MKMapItem(
            placemark: MKPlacemark(coordinate: coordinate)
        )
        request.destination = MKMapItem(
            placemark: MKPlacemark(coordinate: destinationCoordinate)
        )
        switch mode {
        case "driving":
            request.transportType = .automobile
        case "transit":
            request.transportType = .transit
        default:
            request.transportType = .walking
        }

        let directions = MKDirections(request: request)
        self.directions = directions

        directions.calculate { [weak self] response, _ in
            guard let self else { return }
            self.directions = nil

            guard let route = response?.routes.first else { return }

            self.navigationRoute = route
            self.routeOverlay = route.polyline
            self.mapView.addOverlay(route.polyline)
            self.mapView.setVisibleMapRect(
                route.polyline.boundingMapRect,
                edgePadding: UIEdgeInsets(top: 100, left: 40, bottom: 80, right: 40),
                animated: true
            )
        }
    }

    private func updateMofuGuidance(at location: CLLocation) {
        guard let route = navigationRoute, !announcedArrival else { return }

        let destinationLocation = CLLocation(
            latitude: destinationCoordinate.latitude,
            longitude: destinationCoordinate.longitude
        )
        let straightDistance = location.distance(from: destinationLocation)

        if straightDistance <= 15 && location.horizontalAccuracy <= 25 {
            announcedArrival = true
            showMofuSpeech("着いたぞ！")
            return
        }

        if straightDistance <= 100 && !announcedNearArrival {
            announcedNearArrival = true
            showMofuSpeech("もうすぐ着くぞ！")
        }

        guard location.horizontalAccuracy <= 35 else { return }

        for (index, step) in route.steps.enumerated() {
            guard !announcedSteps.contains(index),
                  step.polyline.pointCount > 0,
                  !step.instructions.isEmpty else { continue }

            let start = step.polyline.points()[0].coordinate
            let stepLocation = CLLocation(
                latitude: start.latitude,
                longitude: start.longitude
            )
            let distance = location.distance(from: stepLocation)

            guard distance <= 45 else { continue }

            let instruction = step.instructions.lowercased()
            let message: String?

            if instruction.contains("右折") ||
               instruction.contains("右に曲") ||
               instruction.contains("turn right") {
                message = "次は右だぞ！"
            } else if instruction.contains("左折") ||
                      instruction.contains("左に曲") ||
                      instruction.contains("turn left") {
                message = "次は左だぞ！"
            } else {
                message = nil
            }

            if let message {
                announcedSteps.insert(index)
                showMofuSpeech(message)
                break
            }
        }
    }

    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        if annotation === destination {
            return nil
        }

        if annotation === mofu {
            let identifier = "Mofu"
            let view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier)
                ?? MKAnnotationView(annotation: annotation, reuseIdentifier: identifier)

            view.annotation = annotation
            view.canShowCallout = true

            view.image = mofuFrames.first
            mofuView = view
            return view
        }

        return nil
    }

    private func loadMofuFrames() {
        if mode == "driving" || mode == "transit" {
            let prefix = mode == "driving"
                ? "TravelMofuCar"
                : "TravelMofuTrain"

            mofuFrames = (1...6).compactMap { number in
                UIImage(named: "\(prefix)\(number)")?
                    .resized(to: CGSize(width: 100, height: 70))
            }

            NSLog("🐾 \(prefix): \(mofuFrames.count)コマ")
            return
        }

        guard let url = Bundle.main.url(
            forResource: "mofu-travel-walk",
            withExtension: "png"
        ),
        let image = UIImage(contentsOfFile: url.path),
        let cgImage = image.cgImage else {
            NSLog("⚠️ モフ画像を読み込めませんでした")
            return
        }

        let width = cgImage.width / 2
        let height = cgImage.height / 2

        let rectangles = [
            CGRect(x: 0, y: 0, width: width, height: height),
            CGRect(x: width, y: 0, width: width, height: height)
        ]

        mofuFrames = rectangles.compactMap { rect in
            guard let cropped = cgImage.cropping(to: rect) else {
                return nil
            }

            return UIImage(cgImage: cropped)
                .resized(to: CGSize(width: 80, height: 80))
        }
    }

    @objc private func updateMofuAnimation() {
        guard !mofuFrames.isEmpty else { return }

        let isMoving = Date().timeIntervalSince(lastMovementTime) < 3

        if isMoving {
            let speed = mode == "walking" ? 2.0 : 6.0
            let frame = Int(Date().timeIntervalSince1970 * speed)
                % mofuFrames.count
            mofuView?.image = mofuFrames[frame]
        } else {
            mofuView?.image = mofuFrames[0]
        }
    }

    func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
        let renderer = MKPolylineRenderer(overlay: overlay)
        renderer.strokeColor = .systemGreen
        renderer.lineWidth = 6
        return renderer
    }
}

private extension UIImage {
    func resized(to size: CGSize) -> UIImage {
        let renderer = UIGraphicsImageRenderer(size: size)
        return renderer.image { _ in
            draw(in: CGRect(origin: .zero, size: size))
        }
    }
}
