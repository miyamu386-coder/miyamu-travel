import type { TouristSpot } from "./touristSpots";

// 観光スポットの名称・所在地の確認元は各地方のJNTO観光案内。
// 確認日 2026-11-20。紹介文はアプリ向けに作成。
// 営業時間・入場料・交通や見学の可否は各施設の公式案内を確認。
export const expandedTouristSpots: TouristSpot[] = [

  // https://www.japan.travel/en/destinations/tohoku/aomori/
  { id: "travel-aomori-aoni", prefectureId: "aomori", name: "青荷温泉", area: "黒石市", category: "温泉", description: "山あいにある、ランプの宿で知られる温泉。" },
  { id: "travel-aomori-museum-art", prefectureId: "aomori", name: "青森県立美術館", area: "青森市", category: "美術館", description: "青森ゆかりの作品と美術に触れられる美術館。" },
  { id: "travel-aomori-oirase", prefectureId: "aomori", name: "奥入瀬渓流", area: "十和田市", category: "自然", description: "苔むす岩や滝が続く渓流沿いの景観を楽しめる。" },
  { id: "travel-aomori-lake-towada", prefectureId: "aomori", name: "十和田湖", area: "十和田市", category: "自然", description: "青森と秋田にまたがるカルデラ湖。湖畔を巡る旅に。" },

  // https://www.japan.travel/en/destinations/tohoku/iwate/
  { id: "travel-iwate-ryusendo", prefectureId: "iwate", name: "龍泉洞", area: "岩泉町", category: "自然", description: "地底湖で知られる鍾乳洞。" },
  { id: "travel-iwate-jodogahama", prefectureId: "iwate", name: "浄土ヶ浜", area: "宮古市", category: "自然", description: "白い岩と穏やかな入り江がつくる海岸景観。" },
  { id: "travel-iwate-motsuji", prefectureId: "iwate", name: "毛越寺", area: "平泉町", category: "寺院", description: "浄土庭園を巡り、平泉の歴史に触れられる寺院。" },
  { id: "travel-iwate-morioka-castle", prefectureId: "iwate", name: "盛岡城跡公園", area: "盛岡市", category: "歴史・公園", description: "石垣が残る城跡を散策できる公園。" },

  // https://www.japan.travel/en/destinations/tohoku/miyagi/
  { id: "travel-miyagi-zao-fox", prefectureId: "miyagi", name: "宮城蔵王キツネ村", area: "白石市", category: "動物・観光", description: "蔵王の山あいにある、キツネを見られる施設。" },
  { id: "travel-miyagi-tashirojima", prefectureId: "miyagi", name: "田代島", area: "石巻市", category: "島・街歩き", description: "石巻沖に浮かぶ、猫で知られる島。" },
  { id: "travel-miyagi-sendai-castle", prefectureId: "miyagi", name: "仙台城跡", area: "仙台市", category: "城・歴史", description: "伊達政宗ゆかりの城跡から仙台の街を見渡せる。" },
  { id: "travel-miyagi-zuihoden", prefectureId: "miyagi", name: "瑞鳳殿", area: "仙台市", category: "歴史", description: "伊達政宗の霊屋。木々に囲まれた境内を巡る。" },

  // https://www.japan.travel/en/destinations/tohoku/akita/
  { id: "travel-akita-dakigaeri", prefectureId: "akita", name: "抱返り渓谷", area: "仙北市", category: "自然", description: "渓流と岩壁、季節の木々が彩る渓谷。" },
  { id: "travel-akita-lake-tazawa", prefectureId: "akita", name: "田沢湖", area: "仙北市", category: "自然", description: "青い湖面が広がる、秋田を代表する湖。" },
  { id: "travel-akita-nyuto", prefectureId: "akita", name: "乳頭温泉郷", area: "仙北市", category: "温泉", description: "山あいの自然に囲まれた温泉郷。" },
  { id: "travel-akita-namahage", prefectureId: "akita", name: "なまはげ館", area: "男鹿市", category: "文化・博物館", description: "男鹿のなまはげ文化を紹介する展示施設。" },

  // https://www.japan.travel/en/destinations/tohoku/yamagata/
  { id: "travel-yamagata-ginzan", prefectureId: "yamagata", name: "銀山温泉", area: "尾花沢市", category: "温泉・街歩き", description: "川沿いに木造旅館が並ぶ温泉街。" },
  { id: "travel-yamagata-kamo", prefectureId: "yamagata", name: "鶴岡市立加茂水族館", area: "鶴岡市", category: "水族館", description: "クラゲの展示で知られる水族館。" },
  { id: "travel-yamagata-castle-park", prefectureId: "yamagata", name: "霞城公園", area: "山形市", category: "城・歴史", description: "山形城跡を整備した公園。" },
  { id: "travel-yamagata-jurokurakan", prefectureId: "yamagata", name: "十六羅漢岩", area: "遊佐町", category: "歴史・海岸", description: "日本海沿いの岩に刻まれた仏像群。" },

  // https://www.japan.travel/en/destinations/tohoku/fukushima/
  { id: "travel-fukushima-ouchijuku", prefectureId: "fukushima", name: "大内宿", area: "下郷町", category: "歴史・街歩き", description: "茅葺き屋根の家々が並ぶ旧宿場町。" },
  { id: "travel-fukushima-goshikinuma", prefectureId: "fukushima", name: "五色沼湖沼群", area: "北塩原村", category: "自然", description: "さまざまな色合いの湖沼を巡る裏磐梯の散策地。" },
  { id: "travel-fukushima-oze", prefectureId: "fukushima", name: "尾瀬国立公園・檜枝岐側", area: "檜枝岐村", category: "自然", description: "福島側から尾瀬の山や湿原を目指す入口。" },
  { id: "travel-fukushima-abukuma", prefectureId: "fukushima", name: "あぶくま洞", area: "田村市", category: "自然", description: "鍾乳石が連なる洞内の景観を楽しめる。" },

  // https://www.japan.travel/en/destinations/kanto/ibaraki/
  { id: "travel-ibaraki-hitachi-seaside", prefectureId: "ibaraki", name: "国営ひたち海浜公園", area: "ひたちなか市", category: "公園・自然", description: "季節の花々と広い園内の散策を楽しめる公園。" },
  { id: "travel-ibaraki-ushiku", prefectureId: "ibaraki", name: "牛久大仏", area: "牛久市", category: "寺院・観光", description: "大きな青銅製の立像で知られる仏教施設。" },
  { id: "travel-ibaraki-tsukuba-space", prefectureId: "ibaraki", name: "筑波宇宙センター", area: "つくば市", category: "科学・展示", description: "宇宙開発の研究施設と展示を通じて宇宙に触れる。" },
  { id: "travel-ibaraki-fukuroda", prefectureId: "ibaraki", name: "袋田の滝", area: "大子町", category: "自然", description: "幾段にも流れ落ちる滝と渓谷の景観。" },

  // https://www.japan.travel/en/destinations/kanto/tochigi/
  { id: "travel-tochigi-chuzenji", prefectureId: "tochigi", name: "中禅寺湖", area: "日光市", category: "自然", description: "奥日光の山々に囲まれた湖。" },
  { id: "travel-tochigi-ashikaga-flower", prefectureId: "tochigi", name: "あしかがフラワーパーク", area: "足利市", category: "花・公園", description: "藤をはじめ、季節の花々を楽しめる施設。" },
  { id: "travel-tochigi-edo-wonderland", prefectureId: "tochigi", name: "江戸ワンダーランド 日光江戸村", area: "日光市", category: "文化・体験", description: "江戸の町並みを再現した体験型の施設。" },
  { id: "travel-tochigi-kinugawa", prefectureId: "tochigi", name: "鬼怒川温泉", area: "日光市", category: "温泉", description: "鬼怒川の渓谷沿いに広がる温泉地。" },

  // https://www.japan.travel/en/destinations/kanto/gunma/
  { id: "travel-gunma-ikaho", prefectureId: "gunma", name: "伊香保温泉", area: "渋川市", category: "温泉・街歩き", description: "石段街を中心に旅館や店が並ぶ温泉地。" },
  { id: "travel-gunma-minakami", prefectureId: "gunma", name: "水上温泉", area: "みなかみ町", category: "温泉", description: "利根川の流れと山々に囲まれた温泉地。" },
  { id: "travel-gunma-tanigawa", prefectureId: "gunma", name: "谷川岳ロープウェイ", area: "みなかみ町", category: "自然・展望", description: "谷川岳の山岳景観を楽しむロープウェイ。" },
  { id: "travel-gunma-tomioka", prefectureId: "gunma", name: "富岡製糸場", area: "富岡市", category: "歴史", description: "日本の近代製糸業を伝える歴史的な工場。" },

  // https://www.japan.travel/en/destinations/kanto/saitama/
  { id: "travel-saitama-railway-museum", prefectureId: "saitama", name: "鉄道博物館", area: "さいたま市", category: "博物館", description: "車両展示を通じて鉄道の歴史や技術に触れられる。" },
  { id: "travel-saitama-g-cans", prefectureId: "saitama", name: "首都圏外郭放水路", area: "春日部市", category: "施設・見学", description: "洪水対策の大規模な地下施設。見学は公式案内を確認。" },
  { id: "travel-saitama-nagatoro", prefectureId: "saitama", name: "長瀞岩畳", area: "長瀞町", category: "自然", description: "荒川沿いに広がる岩畳と渓谷を散策できる。" },
  { id: "travel-saitama-mitsumine", prefectureId: "saitama", name: "三峯神社", area: "秩父市", category: "神社", description: "秩父の山中に鎮座する神社。" },

  // https://www.japan.travel/en/destinations/kanto/chiba/
  { id: "travel-chiba-yoro", prefectureId: "chiba", name: "養老渓谷", area: "市原市・大多喜町", category: "自然", description: "川沿いの散策と渓谷の景観を楽しめる地域。" },
  { id: "travel-chiba-nokogiri", prefectureId: "chiba", name: "鋸山", area: "富津市・鋸南町", category: "自然・展望", description: "東京湾を望む展望と石切場跡の景観。" },
  { id: "travel-chiba-kujukuri", prefectureId: "chiba", name: "九十九里浜", area: "九十九里地域", category: "海岸", description: "太平洋に面して長い砂浜が続く海岸。" },
  { id: "travel-chiba-sawara", prefectureId: "chiba", name: "佐原の町並み", area: "香取市", category: "歴史・街歩き", description: "小野川沿いに商家などの歴史的建物が残る町並み。" },

  // https://www.japan.travel/en/destinations/kanto/tokyo/
  { id: "travel-tokyo-imperial-palace", prefectureId: "tokyo", name: "皇居外苑", area: "千代田区", category: "歴史・散策", description: "皇居前の広場や二重橋周辺を散策できる。" },
  { id: "travel-tokyo-tokyo-station", prefectureId: "tokyo", name: "東京駅丸の内駅舎", area: "千代田区", category: "建築・街歩き", description: "赤レンガの駅舎が印象的な東京の玄関口。" },
  { id: "travel-tokyo-kabukiza", prefectureId: "tokyo", name: "歌舞伎座", area: "中央区", category: "文化", description: "銀座にある歌舞伎の劇場。" },
  { id: "travel-tokyo-tsukiji", prefectureId: "tokyo", name: "築地場外市場", area: "中央区", category: "グルメ・街歩き", description: "食材や飲食の店が集まる市場の町。" },

  // https://www.japan.travel/en/destinations/hokuriku-shinetsu/niigata/
  { id: "travel-niigata-naeba", prefectureId: "niigata", name: "苗場スキー場", area: "湯沢町", category: "山・リゾート", description: "苗場の山々を背景に広がるスキーリゾート。" },
  { id: "travel-niigata-myoko-suginohara", prefectureId: "niigata", name: "妙高杉ノ原スキー場", area: "妙高市", category: "山・リゾート", description: "妙高山麓の自然に囲まれたスキー場。" },
  { id: "travel-niigata-hoshitoge", prefectureId: "niigata", name: "星峠の棚田", area: "十日町市", category: "自然・景観", description: "山あいに田が連なる里山の景観。" },
  { id: "travel-niigata-sado-gold", prefectureId: "niigata", name: "佐渡金山", area: "佐渡市", category: "歴史", description: "佐渡の鉱山の歴史を伝える史跡。" },

  // https://www.japan.travel/en/destinations/hokuriku-shinetsu/toyama/
  { id: "travel-toyama-kurobe-gorge", prefectureId: "toyama", name: "黒部峡谷", area: "黒部市", category: "自然", description: "深い谷と山々が連なる黒部川流域の景観。" },
  { id: "travel-toyama-takaoka-park", prefectureId: "toyama", name: "高岡古城公園", area: "高岡市", category: "歴史・公園", description: "高岡城跡に広がる、水堀と緑の公園。" },
  { id: "travel-toyama-tonami-tulip", prefectureId: "toyama", name: "砺波チューリップ公園", area: "砺波市", category: "花・公園", description: "チューリップに親しめる砺波の公園。" },
  { id: "travel-toyama-gokayama", prefectureId: "toyama", name: "五箇山合掌造り集落", area: "南砺市", category: "歴史・街歩き", description: "山あいに合掌造りの家々が残る集落。" },

  // https://www.japan.travel/en/destinations/hokuriku-shinetsu/ishikawa/
  { id: "travel-ishikawa-higashi-chaya", prefectureId: "ishikawa", name: "ひがし茶屋街", area: "金沢市", category: "歴史・街歩き", description: "茶屋建築が並ぶ金沢の歴史的な町並み。" },
  { id: "travel-ishikawa-omicho", prefectureId: "ishikawa", name: "近江町市場", area: "金沢市", category: "グルメ・街歩き", description: "鮮魚や食材、飲食の店が集まる市場。" },
  { id: "travel-ishikawa-kanazawa-castle", prefectureId: "ishikawa", name: "金沢城公園", area: "金沢市", category: "城・歴史", description: "城郭建築と石垣を巡れる公園。" },
  { id: "travel-ishikawa-museum21", prefectureId: "ishikawa", name: "金沢21世紀美術館", area: "金沢市", category: "美術館", description: "現代美術に触れられる金沢の美術館。" },

  // https://www.japan.travel/en/destinations/hokuriku-shinetsu/fukui/
  { id: "travel-fukui-tojinbo", prefectureId: "fukui", name: "東尋坊", area: "坂井市", category: "自然", description: "日本海に面して柱状の岩壁が続く海岸。" },
  { id: "travel-fukui-dinosaur-museum", prefectureId: "fukui", name: "福井県立恐竜博物館", area: "勝山市", category: "博物館", description: "恐竜や地球の歴史を紹介する博物館。" },
  { id: "travel-fukui-ichijodani", prefectureId: "fukui", name: "一乗谷朝倉氏遺跡", area: "福井市", category: "歴史", description: "戦国時代の城下町の跡が残る遺跡。" },
  { id: "travel-fukui-ono-castle", prefectureId: "fukui", name: "越前大野城", area: "大野市", category: "城・歴史", description: "大野の城下町を見渡す山上の城。" },

  // https://www.japan.travel/en/destinations/tokai/yamanashi/
  { id: "travel-yamanashi-kawaguchi", prefectureId: "yamanashi", name: "河口湖", area: "富士河口湖町", category: "自然", description: "富士山を望む富士五湖の一つ。" },
  { id: "travel-yamanashi-fujiq", prefectureId: "yamanashi", name: "富士急ハイランド", area: "富士吉田市", category: "テーマパーク", description: "富士山の麓にある遊園地。" },
  { id: "travel-yamanashi-narusawa", prefectureId: "yamanashi", name: "鳴沢氷穴", area: "鳴沢村", category: "自然", description: "富士山麓の溶岩洞窟。" },
  { id: "travel-yamanashi-tomi-no-oka", prefectureId: "yamanashi", name: "サントリー登美の丘ワイナリー", area: "甲斐市", category: "文化・見学", description: "ぶどう畑が広がる丘のワイナリー。" },

  // https://www.japan.travel/en/destinations/hokuriku-shinetsu/nagano/
  { id: "travel-nagano-suwa", prefectureId: "nagano", name: "諏訪大社", area: "諏訪地域", category: "神社", description: "諏訪湖周辺に四つの宮が鎮座する神社。" },
  { id: "travel-nagano-zenkoji", prefectureId: "nagano", name: "善光寺", area: "長野市", category: "寺院", description: "門前町とともに歴史を重ねてきた寺院。" },
  { id: "travel-nagano-shiga-kogen", prefectureId: "nagano", name: "志賀高原", area: "山ノ内町", category: "自然", description: "湖沼や森林、高原の景観が広がる地域。" },
  { id: "travel-nagano-tsumago", prefectureId: "nagano", name: "妻籠宿", area: "南木曽町", category: "歴史・街歩き", description: "中山道の宿場の町並みが残る地区。" },

  // https://www.japan.travel/en/destinations/tokai/gifu/
  { id: "travel-gifu-monet-pond", prefectureId: "gifu", name: "名もなき池（モネの池）", area: "関市", category: "自然・景観", description: "透明な水と水草の景観で知られる池。" },
  { id: "travel-gifu-magome", prefectureId: "gifu", name: "馬籠宿", area: "中津川市", category: "歴史・街歩き", description: "石畳の坂道に家々が並ぶ中山道の宿場。" },
  { id: "travel-gifu-sekigahara", prefectureId: "gifu", name: "関ケ原古戦場", area: "関ケ原町", category: "歴史", description: "関ケ原の戦いの史跡が点在する地域。" },
  { id: "travel-gifu-takayama-oldtown", prefectureId: "gifu", name: "飛騨高山の古い町並", area: "高山市", category: "歴史・街歩き", description: "商家や酒蔵が並ぶ高山の歴史的な町並み。" },

  // https://www.japan.travel/en/destinations/tokai/shizuoka/
  { id: "travel-shizuoka-okuoi", prefectureId: "shizuoka", name: "奥大井", area: "川根本町", category: "自然", description: "大井川上流の山や渓谷が広がる地域。" },
  { id: "travel-shizuoka-shimoda", prefectureId: "shizuoka", name: "下田の町並み", area: "下田市", category: "歴史・街歩き", description: "開港の歴史を伝える伊豆半島の港町。" },
  { id: "travel-shizuoka-airpark", prefectureId: "shizuoka", name: "航空自衛隊浜松広報館 エアーパーク", area: "浜松市", category: "博物館", description: "航空機の展示を通じて航空に触れられる施設。" },
  { id: "travel-shizuoka-shuzenji", prefectureId: "shizuoka", name: "修禅寺", area: "伊豆市", category: "寺院", description: "修善寺温泉街にある歴史的な寺院。" },

  // https://www.japan.travel/en/destinations/tokai/aichi/
  { id: "travel-aichi-railway-park", prefectureId: "aichi", name: "リニア・鉄道館", area: "名古屋市", category: "博物館", description: "新幹線やリニアなど鉄道技術を紹介する博物館。" },
  { id: "travel-aichi-inuyama-castle", prefectureId: "aichi", name: "犬山城", area: "犬山市", category: "城・歴史", description: "木曽川沿いの丘に立つ歴史的な城。" },
  { id: "travel-aichi-tokugawa-art", prefectureId: "aichi", name: "徳川美術館", area: "名古屋市", category: "美術館", description: "尾張徳川家ゆかりの品々を伝える美術館。" },
  { id: "travel-aichi-atsuta", prefectureId: "aichi", name: "熱田神宮", area: "名古屋市", category: "神社", description: "木々に囲まれた境内を持つ名古屋の神宮。" },

  // https://www.japan.travel/en/destinations/tokai/mie/
  { id: "travel-mie-toba-aquarium", prefectureId: "mie", name: "鳥羽水族館", area: "鳥羽市", category: "水族館", description: "さまざまな水の生き物を紹介する水族館。" },
  { id: "travel-mie-meoto-iwa", prefectureId: "mie", name: "二見興玉神社・夫婦岩", area: "伊勢市", category: "神社・海岸", description: "二見浦の夫婦岩で知られる神社。" },
  { id: "travel-mie-kumanokodo-iseji", prefectureId: "mie", name: "熊野古道 伊勢路", area: "三重県南部", category: "歴史・散策", description: "伊勢と熊野を結ぶ歴史的な参詣道。" },
  { id: "travel-mie-ise-shima", prefectureId: "mie", name: "横山展望台", area: "志摩市", category: "自然・展望", description: "英虞湾の入り組んだ海岸を見渡せる展望地。" },

  // https://www.japan.travel/en/destinations/kansai/shiga/
  { id: "travel-shiga-lake-biwa", prefectureId: "shiga", name: "琵琶湖", area: "滋賀県内", category: "自然", description: "湖畔にさまざまな町や景勝地が広がる湖。" },
  { id: "travel-shiga-koka-ninja", prefectureId: "shiga", name: "甲賀の里忍術村", area: "甲賀市", category: "歴史・体験", description: "甲賀の忍者文化に触れられる施設。" },
  { id: "travel-shiga-hiyoshi", prefectureId: "shiga", name: "日吉大社", area: "大津市", category: "神社", description: "比叡山の麓に鎮座する神社。" },
  { id: "travel-shiga-omi-hachiman", prefectureId: "shiga", name: "八幡堀", area: "近江八幡市", category: "歴史・街歩き", description: "商家の町並みと水辺の景観を楽しめる堀。" },

  // https://www.japan.travel/en/destinations/kansai/kyoto/
  { id: "travel-kyoto-shogunzuka", prefectureId: "kyoto", name: "将軍塚青龍殿", area: "京都市", category: "寺院・展望", description: "東山の高台から京都の街を見渡せる寺院施設。" },
  { id: "travel-kyoto-kenninji", prefectureId: "kyoto", name: "建仁寺", area: "京都市", category: "寺院", description: "祇園にある禅寺。庭や堂内の美術に触れられる。" },
  { id: "travel-kyoto-murinan", prefectureId: "kyoto", name: "無鄰菴", area: "京都市", category: "庭園", description: "東山を借景にした庭園を持つ山縣有朋の旧別荘。" },
  { id: "travel-kyoto-amanohashidate", prefectureId: "kyoto", name: "天橋立", area: "宮津市", category: "自然・景観", description: "宮津湾に伸びる松並木の砂州。" },

  // https://www.japan.travel/en/destinations/kansai/osaka/
  { id: "travel-osaka-tsutenkaku", prefectureId: "osaka", name: "通天閣", area: "大阪市", category: "展望・街歩き", description: "新世界の町並みに立つ展望塔。" },
  { id: "travel-osaka-shinsaibashi", prefectureId: "osaka", name: "心斎橋筋商店街", area: "大阪市", category: "買い物・街歩き", description: "心斎橋を南北に延びる商店街。" },
  { id: "travel-osaka-kaiyukan", prefectureId: "osaka", name: "海遊館", area: "大阪市", category: "水族館", description: "大阪のベイエリアにある大型水族館。" },
  { id: "travel-osaka-hozenji", prefectureId: "osaka", name: "法善寺", area: "大阪市", category: "寺院", description: "難波の路地にある、水掛不動で知られる寺院。" },

  // https://www.japan.travel/en/destinations/kansai/hyogo/
  { id: "travel-hyogo-harborland", prefectureId: "hyogo", name: "神戸ハーバーランド", area: "神戸市", category: "街歩き・港", description: "神戸港を望む商業施設や遊歩道が集まる地区。" },
  { id: "travel-hyogo-akashi-castle", prefectureId: "hyogo", name: "明石城跡", area: "明石市", category: "城・歴史", description: "櫓や石垣が残る城跡。" },
  { id: "travel-hyogo-takeda-castle", prefectureId: "hyogo", name: "竹田城跡", area: "朝来市", category: "城・歴史", description: "山上に石垣が連なる城跡。" },
  { id: "travel-hyogo-akashi-bridge", prefectureId: "hyogo", name: "明石海峡大橋", area: "神戸市・淡路市", category: "建築・景観", description: "本州と淡路島を結ぶ大きな吊橋。" },

  // https://www.japan.travel/en/destinations/kansai/nara/
  { id: "travel-nara-kasuga", prefectureId: "nara", name: "春日大社", area: "奈良市", category: "神社", description: "奈良公園の東側に鎮座する神社。" },
  { id: "travel-nara-imaicho", prefectureId: "nara", name: "今井町の町並み", area: "橿原市", category: "歴史・街歩き", description: "伝統的な町家がまとまって残る地区。" },
  { id: "travel-nara-kofukuji", prefectureId: "nara", name: "興福寺", area: "奈良市", category: "寺院", description: "奈良の歴史と仏教美術を伝える寺院。" },
  { id: "travel-nara-naramachi", prefectureId: "nara", name: "ならまち", area: "奈良市", category: "歴史・街歩き", description: "町家や細い路地が残る奈良の旧市街。" },

  // https://www.japan.travel/en/destinations/kansai/wakayama/
  { id: "travel-wakayama-kumano-hongu", prefectureId: "wakayama", name: "熊野本宮大社", area: "田辺市", category: "神社", description: "熊野古道の参詣先となる熊野三山の一社。" },
  { id: "travel-wakayama-okunoin", prefectureId: "wakayama", name: "高野山 奥之院", area: "高野町", category: "寺院", description: "杉木立に囲まれた参道が続く高野山の聖地。" },
  { id: "travel-wakayama-shukubo", prefectureId: "wakayama", name: "高野山の宿坊", area: "高野町", category: "寺院・文化", description: "寺院での宿泊や精進料理の文化に触れる。" },
  { id: "travel-wakayama-shirahama", prefectureId: "wakayama", name: "白良浜", area: "白浜町", category: "海岸", description: "白い砂浜と海の景観で知られる浜。" },

  // https://www.japan.travel/en/destinations/chugoku/tottori/
  { id: "travel-tottori-sand-museum", prefectureId: "tottori", name: "砂の美術館", area: "鳥取市", category: "美術館", description: "砂を素材とした彫刻作品を展示する施設。" },
  { id: "travel-tottori-daisen", prefectureId: "tottori", name: "大山", area: "大山町周辺", category: "自然", description: "鳥取を代表する山。裾野には多彩な自然が広がる。" },
  { id: "travel-tottori-hanakairo", prefectureId: "tottori", name: "とっとり花回廊", area: "南部町", category: "花・公園", description: "大山を背景に四季の花を楽しめる施設。" },
  { id: "travel-tottori-mitokusan", prefectureId: "tottori", name: "三徳山三佛寺", area: "三朝町", category: "寺院", description: "山の斜面や岩壁に堂宇が建つ山岳寺院。" },

  // https://www.japan.travel/en/destinations/chugoku/shimane/
  { id: "travel-shimane-iwami-ginzan", prefectureId: "shimane", name: "石見銀山", area: "大田市", category: "歴史", description: "鉱山の跡と歴史的な町並みが残る地域。" },
  { id: "travel-shimane-matsue-castle", prefectureId: "shimane", name: "松江城", area: "松江市", category: "城・歴史", description: "現存する木造天守を持つ松江の城。" },
  { id: "travel-shimane-ikoji", prefectureId: "shimane", name: "医光寺", area: "益田市", category: "寺院・庭園", description: "庭園で知られる益田の寺院。" },
  { id: "travel-shimane-matengai", prefectureId: "shimane", name: "摩天崖", area: "西ノ島町", category: "自然", description: "隠岐の国賀海岸にそびえる海食崖。" },

  // https://www.japan.travel/en/destinations/chugoku/okayama/
  { id: "travel-okayama-bitchu-matsuyama", prefectureId: "okayama", name: "備中松山城", area: "高梁市", category: "城・歴史", description: "山上に天守が残る城。" },
  { id: "travel-okayama-ushimado", prefectureId: "okayama", name: "牛窓", area: "瀬戸内市", category: "港・街歩き", description: "瀬戸内海を望む港町。" },
  { id: "travel-okayama-kurashiki", prefectureId: "okayama", name: "倉敷美観地区", area: "倉敷市", category: "歴史・街歩き", description: "白壁の建物と倉敷川沿いの景観が残る地区。" },
  { id: "travel-okayama-okayama-castle", prefectureId: "okayama", name: "岡山城", area: "岡山市", category: "城・歴史", description: "旭川沿いに立つ、黒い外観で知られる城。" },

  // https://www.japan.travel/en/destinations/chugoku/hiroshima/
  { id: "travel-hiroshima-atomic-dome", prefectureId: "hiroshima", name: "原爆ドーム", area: "広島市", category: "歴史・平和", description: "原爆の被害と平和への願いを伝える建物。" },
  { id: "travel-hiroshima-okunoshima", prefectureId: "hiroshima", name: "大久野島", area: "竹原市", category: "島・自然", description: "瀬戸内海に浮かぶ、ウサギで知られる島。" },
  { id: "travel-hiroshima-takehara", prefectureId: "hiroshima", name: "たけはら町並み保存地区", area: "竹原市", category: "歴史・街歩き", description: "商家や町家が残る竹原の歴史的な地区。" },
  { id: "travel-hiroshima-onomichi", prefectureId: "hiroshima", name: "尾道の町並み", area: "尾道市", category: "街歩き・寺院", description: "坂道や寺院、海沿いの風景が広がる町。" },

  // https://www.japan.travel/en/destinations/chugoku/yamaguchi/
  { id: "travel-yamaguchi-motonosumi", prefectureId: "yamaguchi", name: "元乃隅神社", area: "長門市", category: "神社・海岸", description: "海へ向かって鳥居が並ぶ景観で知られる神社。" },
  { id: "travel-yamaguchi-tsunoshima", prefectureId: "yamaguchi", name: "角島大橋", area: "下関市", category: "建築・景観", description: "本土と角島を結ぶ、海上の橋。" },
  { id: "travel-yamaguchi-akiyoshidai", prefectureId: "yamaguchi", name: "秋吉台", area: "美祢市", category: "自然", description: "石灰岩が点在するカルスト台地。" },
  { id: "travel-yamaguchi-benten", prefectureId: "yamaguchi", name: "別府弁天池", area: "美祢市", category: "自然", description: "青く澄んだ水で知られる湧水池。" },

  // https://www.japan.travel/en/destinations/shikoku/tokushima/
  { id: "travel-tokushima-oboke", prefectureId: "tokushima", name: "大歩危・小歩危", area: "三好市", category: "自然", description: "吉野川沿いに岩壁が続く渓谷。" },
  { id: "travel-tokushima-kazurabashi", prefectureId: "tokushima", name: "祖谷のかずら橋", area: "三好市", category: "自然・橋", description: "祖谷の渓谷に架かる、つるで編まれた橋。" },
  { id: "travel-tokushima-awa-kaikan", prefectureId: "tokushima", name: "阿波おどり会館", area: "徳島市", category: "文化・体験", description: "阿波おどりの歴史や踊りに触れられる施設。" },
  { id: "travel-tokushima-ryozenji", prefectureId: "tokushima", name: "霊山寺", area: "鳴門市", category: "寺院", description: "四国八十八箇所の第一番札所。" },

  // https://www.japan.travel/en/destinations/shikoku/kagawa/
  { id: "travel-kagawa-naoshima", prefectureId: "kagawa", name: "直島", area: "直島町", category: "島・美術", description: "瀬戸内海の島々の現代美術に触れる拠点。" },
  { id: "travel-kagawa-angel-road", prefectureId: "kagawa", name: "エンジェルロード", area: "土庄町", category: "自然・海岸", description: "潮の満ち引きによって姿を変える砂の道。" },
  { id: "travel-kagawa-seto-bridge", prefectureId: "kagawa", name: "瀬戸大橋", area: "坂出市・岡山県倉敷市", category: "建築・景観", description: "本州と四国を結ぶ橋梁群。" },
  { id: "travel-kagawa-kotohira", prefectureId: "kagawa", name: "金刀比羅宮", area: "琴平町", category: "神社", description: "長い石段の参道で知られる神社。" },

  // https://www.japan.travel/en/destinations/shikoku/ehime/
  { id: "travel-ehime-shimanami", prefectureId: "ehime", name: "しまなみ海道・今治側", area: "今治市", category: "島・景観", description: "瀬戸内の島々を橋で結ぶルート。" },
  { id: "travel-ehime-shikoku-karst", prefectureId: "ehime", name: "四国カルスト・愛媛側", area: "久万高原町・西予市周辺", category: "自然", description: "高知との県境に広がる高原のカルスト地形。" },
  { id: "travel-ehime-uchikoza", prefectureId: "ehime", name: "内子座", area: "内子町", category: "文化・歴史", description: "木造の劇場で内子の歴史に触れられる。" },
  { id: "travel-ehime-matsuyama-castle", prefectureId: "ehime", name: "松山城", area: "松山市", category: "城・歴史", description: "市街地の山上に天守が立つ城。" },

  // https://www.japan.travel/en/destinations/shikoku/kochi/
  { id: "travel-kochi-shimanto", prefectureId: "kochi", name: "四万十川", area: "四万十市周辺", category: "自然", description: "蛇行する川と沈下橋がつくる景観。" },
  { id: "travel-kochi-ashizuri", prefectureId: "kochi", name: "足摺岬", area: "土佐清水市", category: "自然・展望", description: "太平洋に突き出す岬。" },
  { id: "travel-kochi-harimaya", prefectureId: "kochi", name: "はりまや橋", area: "高知市", category: "街歩き・歴史", description: "高知の市街地にある、物語や歌で知られる橋。" },
  { id: "travel-kochi-monet-garden", prefectureId: "kochi", name: "北川村「モネの庭」マルモッタン", area: "北川村", category: "庭園", description: "モネの庭をもとに整備された庭園。" },

  // https://www.japan.travel/en/destinations/kyushu/fukuoka/
  { id: "travel-fukuoka-nakasu", prefectureId: "fukuoka", name: "中洲", area: "福岡市", category: "グルメ・街歩き", description: "那珂川沿いの繁華街。" },
  { id: "travel-fukuoka-yanagawa", prefectureId: "fukuoka", name: "柳川の川下り", area: "柳川市", category: "景観・体験", description: "水路を舟で巡る柳川の観光体験。" },
  { id: "travel-fukuoka-fukuoka-tower", prefectureId: "fukuoka", name: "福岡タワー", area: "福岡市", category: "展望", description: "海沿いの百道地区に立つ展望塔。" },
  { id: "travel-fukuoka-mojiko", prefectureId: "fukuoka", name: "門司港レトロ", area: "北九州市", category: "歴史・街歩き", description: "港の周辺に歴史的な建物が並ぶ地区。" },

  // https://www.japan.travel/en/destinations/kyushu/saga/
  { id: "travel-saga-okawachiyama", prefectureId: "saga", name: "大川内山", area: "伊万里市", category: "工芸・街歩き", description: "焼き物の窯元が集まる山あいの里。" },
  { id: "travel-saga-karatsu-castle", prefectureId: "saga", name: "唐津城", area: "唐津市", category: "城・歴史", description: "唐津湾を望む高台に立つ城。" },
  { id: "travel-saga-takeo", prefectureId: "saga", name: "武雄温泉", area: "武雄市", category: "温泉", description: "朱塗りの楼門で知られる温泉地。" },
  { id: "travel-saga-ureshino", prefectureId: "saga", name: "嬉野温泉", area: "嬉野市", category: "温泉", description: "川沿いに旅館や店が並ぶ温泉街。" },

  // https://www.japan.travel/en/destinations/kyushu/nagasaki/
  { id: "travel-nagasaki-atomic-museum", prefectureId: "nagasaki", name: "長崎原爆資料館", area: "長崎市", category: "歴史・平和", description: "原爆の被害と平和について学ぶ資料館。" },
  { id: "travel-nagasaki-gunkanjima", prefectureId: "nagasaki", name: "端島（軍艦島）", area: "長崎市", category: "歴史", description: "炭鉱の建物が残る島。上陸可否は公式案内を確認。" },
  { id: "travel-nagasaki-unzen", prefectureId: "nagasaki", name: "雲仙温泉", area: "雲仙市", category: "温泉", description: "雲仙の山々と地熱の景観に囲まれた温泉地。" },
  { id: "travel-nagasaki-dejima", prefectureId: "nagasaki", name: "出島", area: "長崎市", category: "歴史", description: "海外との交流の歴史を伝える史跡。" },

  // https://www.japan.travel/en/destinations/kyushu/kumamoto/
  { id: "travel-kumamoto-kurokawa", prefectureId: "kumamoto", name: "黒川温泉", area: "南小国町", category: "温泉", description: "川沿いに旅館が並ぶ山あいの温泉地。" },
  { id: "travel-kumamoto-kuma-river", prefectureId: "kumamoto", name: "球磨川くだり", area: "人吉市", category: "自然・体験", description: "球磨川の流れを舟から楽しむ体験。" },
  { id: "travel-kumamoto-aso-farmland", prefectureId: "kumamoto", name: "阿蘇ファームランド", area: "南阿蘇村", category: "自然・体験", description: "阿蘇地域にある体験型の施設。" },
  { id: "travel-kumamoto-suizenji", prefectureId: "kumamoto", name: "水前寺成趣園", area: "熊本市", category: "庭園", description: "湧水の池と築山がある回遊式庭園。" },

  // https://www.japan.travel/en/destinations/kyushu/oita/
  { id: "travel-oita-yufuin", prefectureId: "oita", name: "由布院温泉", area: "由布市", category: "温泉", description: "由布岳を望む温泉地。" },
  { id: "travel-oita-takasakiyama", prefectureId: "oita", name: "高崎山自然動物園", area: "大分市", category: "動物・自然", description: "野生のサルを観察できる施設。" },
  { id: "travel-oita-kokonoe-bridge", prefectureId: "oita", name: "九重“夢”大吊橋", area: "九重町", category: "自然・展望", description: "渓谷と滝を見渡せる吊橋。" },
  { id: "travel-oita-usa-jingu", prefectureId: "oita", name: "宇佐神宮", area: "宇佐市", category: "神社", description: "宇佐の森に鎮座する八幡信仰の神社。" },

  // https://www.japan.travel/en/destinations/kyushu/miyazaki/
  { id: "travel-miyazaki-miyazaki-jingu", prefectureId: "miyazaki", name: "宮崎神宮", area: "宮崎市", category: "神社", description: "森に囲まれた宮崎の神社。" },
  { id: "travel-miyazaki-amanoiwato", prefectureId: "miyazaki", name: "天岩戸神社", area: "高千穂町", category: "神社", description: "天岩戸伝説を伝える神社。" },
  { id: "travel-miyazaki-takachiho-jinja", prefectureId: "miyazaki", name: "高千穂神社", area: "高千穂町", category: "神社", description: "高千穂の歴史と神話に触れられる神社。" },
  { id: "travel-miyazaki-aoshima", prefectureId: "miyazaki", name: "青島", area: "宮崎市", category: "島・自然", description: "特徴的な海岸の岩と亜熱帯の植物に囲まれた島。" },

  // https://www.japan.travel/en/destinations/kyushu/kagoshima/
  { id: "travel-kagoshima-senganen", prefectureId: "kagoshima", name: "仙巌園", area: "鹿児島市", category: "庭園・歴史", description: "桜島を望む島津家ゆかりの庭園。" },
  { id: "travel-kagoshima-kirishima-jingu", prefectureId: "kagoshima", name: "霧島神宮", area: "霧島市", category: "神社", description: "霧島の山々の麓に鎮座する神社。" },
  { id: "travel-kagoshima-yakushima", prefectureId: "kagoshima", name: "屋久島", area: "屋久島町", category: "島・自然", description: "深い森や渓流が広がる島。" },
  { id: "travel-kagoshima-ibusuki", prefectureId: "kagoshima", name: "指宿温泉", area: "指宿市", category: "温泉", description: "砂むし温泉で知られる海沿いの温泉地。" },

  // https://www.japan.travel/en/destinations/okinawa/okinawa/
  { id: "travel-okinawa-churaumi", prefectureId: "okinawa", name: "沖縄美ら海水族館", area: "本部町", category: "水族館", description: "沖縄の海の生き物を紹介する水族館。" },
  { id: "travel-okinawa-kabira", prefectureId: "okinawa", name: "川平湾", area: "石垣市", category: "自然・海岸", description: "島々と海がつくる景観で知られる石垣島の湾。" },
  { id: "travel-okinawa-gyokusendo", prefectureId: "okinawa", name: "玉泉洞", area: "南城市", category: "自然", description: "沖縄本島南部にある鍾乳洞。" },
  { id: "travel-okinawa-himeyuri", prefectureId: "okinawa", name: "ひめゆりの塔", area: "糸満市", category: "歴史・平和", description: "沖縄戦の記憶を伝える慰霊碑。" },
];
