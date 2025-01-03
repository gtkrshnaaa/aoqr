// migrations/migration-up.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function migrateUp() {
    try {
        // Buat tabel admins
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Insert data admin default
        const passwordHash = await bcrypt.hash('admin_password', 10);
        await db.query(`INSERT INTO admins (email, password) VALUES ('admin@example.com', ?)`, [passwordHash]);

        

        // Buat tabel categories
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);


        // // Buat tabel objects
        // await db.query(`
        //     CREATE TABLE IF NOT EXISTS objects (
        //         id INT AUTO_INCREMENT PRIMARY KEY,
        //         name VARCHAR(100) NOT NULL,
        //         image_url JSON,
        //         qr_image_url VARCHAR(255) NULL,
        //         location VARCHAR(100),
        //         category_id INT,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
        //         description_english TEXT,

        //         description_indonesian TEXT NULL,

        //         description_chinese_simp TEXT NULL,

        //         description_japanese TEXT NULL,

        //         description_korean TEXT NULL,

        //         description_russian TEXT NULL,

        //         description_spanish TEXT NULL,

        //         description_dutch TEXT NULL,

        //         CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        //     );
        // `);


        // Buat tabel objects
        await db.query(`
            CREATE TABLE IF NOT EXISTS objects (
                id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
                image_url JSON,
                qr_image_url VARCHAR(255) NULL,
                category_id INT,
                view_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
                name_english VARCHAR(100) NOT NULL,
                location_english VARCHAR(100) NOT NULL,
                description_english TEXT NOT NULL,

                name_indonesian VARCHAR(100) NULL,
                location_indonesian VARCHAR(100) NULL,
                description_indonesian TEXT NULL,

                name_chinese_simp VARCHAR(100) NULL,
                location_chinese_simp VARCHAR(100) NULL,
                description_chinese_simp TEXT NULL,

                name_japanese VARCHAR(100) NULL,
                location_japanese VARCHAR(100) NULL,
                description_japanese TEXT NULL,

                name_korean VARCHAR(100) NULL,
                location_korean VARCHAR(100) NULL,
                description_korean TEXT NULL,

                name_russian VARCHAR(100) NULL,
                location_russian VARCHAR(100) NULL,
                description_russian TEXT NULL,

                name_spanish VARCHAR(100) NULL,
                location_spanish VARCHAR(100) NULL,
                description_spanish TEXT NULL,

                name_dutch VARCHAR(100) NULL,
                location_dutch VARCHAR(100) NULL,
                description_dutch TEXT NULL,

                CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            );
        `);


         // Insert data dummy ke categories
         await db.query(`
            INSERT INTO categories (name) VALUES 
            ('Relief'),
            ('Mozaik'),
            ('Bangunan Sejarah'),
            ('Artefak Kerajaan');
        `);

        // Insert data dummy ke objects
        await db.query(`
            INSERT INTO objects (
                id, image_url, qr_image_url, category_id, view_count,
                name_english, location_english, description_english,
                name_indonesian, location_indonesian, description_indonesian,
                name_chinese_simp, location_chinese_simp, description_chinese_simp,
                name_japanese, location_japanese, description_japanese,
                name_korean, location_korean, description_korean,
                name_russian, location_russian, description_russian,
                name_spanish, location_spanish, description_spanish,
                name_dutch, location_dutch, description_dutch
            ) VALUES
            -- Relief "Untung Rugi di Lereng Merapi"
            (UUID(), JSON_ARRAY('https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'), '', 1, 150,
            'Relief "The Gains and Losses of Living on Merapi Slopes"', 'Lobby, Royal Ambarrukmo Hotel', 'A grand andesite relief crafted in 1964-1965 by Harijadi Sumadidjaja and the Selabinangun team. It portrays the daily lives of people living on the slopes of Mount Merapi.',
            'Relief "Untung Rugi di Lereng Merapi"', 'Lobi, Hotel Royal Ambarrukmo', 'Relief andesit besar yang dibuat tahun 1964-1965 oleh Harijadi Sumadidjaja dan tim Sanggar Selabinangun. Menggambarkan kehidupan masyarakat di lereng Gunung Merapi.',
            '“火山脚下的得失”浮雕', '大堂, 皇家安巴鲁克莫酒店', '由 Harijadi Sumadidjaja 和 Selabinangun 团队在 1964-1965 年创作的宏伟安山岩浮雕。描绘了生活在默拉皮山坡上的人们的日常生活。',
            '「メラピ山麓の損得」レリーフ', 'ロビー, ロイヤルアンバルクモホテル', '1964-1965 年、Harijadi Sumadidjaja と Selabinangun チームが制作した壮大な安山岩レリーフ。メラピ山麓の人々の日常生活を描いています。',
            '“메라피 산 기슭의 손익” 부조', '로비, 로얄 암바루크모 호텔', 'Harijadi Sumadidjaja와 Selabinangun 팀이 1964-1965년에 제작한 웅장한 안산암 부조. 메라피 산 기슭에 사는 사람들의 일상을 묘사합니다。',
            'Рельеф "Потери и выгоды у подножия вулкана Мерапи"', 'Лобби, Отель Роял Амбаррукмо', 'Великий андезитовый рельеф, созданный в 1964-1965 годах Харияди Сумадиджая и командой Селабинагуну. Изображает повседневную жизнь людей, живущих на склонах вулкана Мерапи.',
            'Relieve "Ganancias y pérdidas en las laderas del Merapi"', 'Vestíbulo, Hotel Royal Ambarrukmo', 'Un gran relieve de andesita creado en 1964-1965 por Harijadi Sumadidjaja y el equipo de Selabinangun. Representa la vida diaria de las personas que viven en las laderas del Monte Merapi.',
            'Relief "Winst en verlies aan de hellingen van de Merapi"', 'Lobby, Royal Ambarrukmo Hotel', 'Een groot andesietreliëf, gemaakt in 1964-1965 door Harijadi Sumadidjaja en het Selabinangun-team. Beeldt het dagelijks leven uit van mensen die op de hellingen van de Merapi wonen.'),

            -- Mozaik "Kehidupan Masyarakat di Jawa Tengah"
            (UUID(), JSON_ARRAY('https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'), '', 2, 120,
            'Mosaic "Life in Central Java"', '1st Floor, Royal Ambarrukmo Hotel', 'A ceramic mosaic crafted by J. Soedhiono in 1964-1965, illustrating traditional markets and daily life in Central Java.',
            'Mozaik "Kehidupan Masyarakat di Jawa Tengah"', 'Lantai 1, Hotel Royal Ambarrukmo', 'Mozaik keramik karya J. Soedhiono tahun 1964-1965 yang menggambarkan pasar tradisional dan kehidupan sehari-hari di Jawa Tengah.',
            '“中爪哇人的生活”马赛克', '1楼, 皇家安巴鲁克莫酒店', '由 J. Soedhiono 在 1964-1965 年创作的陶瓷马赛克，描绘了中爪哇的传统市场和日常生活。',
            '「中部ジャワの人々の生活」モザイク', '1階, ロイヤルアンバルクモホテル', 'J. Soedhiono が 1964-1965 年に制作した陶器のモザイクで、中部ジャワの伝統的な市場と日常生活を描いています。',
            '“중부 자바의 삶” 모자이크', '1층, 로얄 암바루크모 호텔', 'J. Soedhiono가 1964-1965년에 만든 도자기 모자이크로 중부 자바의 전통 시장과 일상을 묘사합니다。',
            'Мозаика "Жизнь в Центральной Яве"', '1 этаж, Отель Роял Амбаррукмо', 'Керамическая мозаика, созданная J. Soedhiono в 1964-1965 годах, изображающая традиционные рынки и повседневную жизнь в Центральной Яве.',
            'Mosaico "La vida en Java Central"', '1er piso, Hotel Royal Ambarrukmo', 'Un mosaico cerámico creado por J. Soedhiono en 1964-1965, que ilustra mercados tradicionales y la vida cotidiana en Java Central.',
            'Mozaïek "Het leven in Midden-Java"', '1e verdieping, Royal Ambarrukmo Hotel', 'Een keramische mozaïek gemaakt door J. Soedhiono in 1964-1965, die traditionele markten en het dagelijkse leven in Midden-Java uitbeeldt.'),

            -- Patung Garuda Wisnu
            (UUID(), JSON_ARRAY('https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'), '', 3, 200,
            'Garuda Wisnu Statue', 'Garden, Royal Ambarrukmo Hotel', 'A magnificent bronze statue crafted by Nyoman Nuarta in 1965, symbolizing the epic figure Garuda Wisnu with intricate details.',
            'Patung Garuda Wisnu', 'Taman, Hotel Royal Ambarrukmo', 'Patung perunggu megah karya Nyoman Nuarta tahun 1965 yang melambangkan tokoh epik Garuda Wisnu dengan detail yang menakjubkan.',
            '“迦鲁达维瑟努”雕像', '花园, 皇家安巴鲁克莫酒店', '由 Nyoman Nuarta 于 1965 年创作的宏伟青铜雕像，象征着史诗人物迦鲁达维瑟努，细节精美。',
            '「ガルーダ・ウィシュヌ」像', '庭園, ロイヤルアンバルクモホテル', '1965 年に Nyoman Nuarta が制作した壮大な青銅像で、ガルーダ・ウィシュヌの叙事詩的人物を象徴しています。',
            '“가루다 위스누” 동상', '정원, 로얄 암바루크모 호텔', 'Nyoman Nuarta가 1965년에 제작한 웅장한 청동 동상으로, 서사적인 인물 가루다 위스누를 상징합니다。',
            'Статуя "Гаруда Вишну"', 'Сад, Отель Роял Амбаррукмо', 'Великолепная бронзовая статуя, созданная Nyoman Nuarta в 1965 году, символизирующая эпического героя Гаруда Вишну с изысканными деталями.',
            'Estatua de Garuda Wisnu', 'Jardín, Hotel Royal Ambarrukmo', 'Una magnífica estatua de bronce creada por Nyoman Nuarta en 1965, que simboliza la figura эпическая de Garuda Wisnu с detalles intrincados.',
            'Garuda Wisnu Beeld', 'Tuin, Royal Ambarrukmo Hotel', 'Een prachtige bronzen beeldhouwwerk gemaakt door Nyoman Nuarta in 1965, die het epische figuur Garuda Wisnu symboliseert met fijne details.'),

            -- Keris Pusaka Keraton
            (UUID(), JSON_ARRAY('https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'), '', 4, 180,
            'Keris Pusaka of the Royal Palace', 'Gallery, Royal Ambarrukmo Hotel', 'An heirloom dagger from the Yogyakarta Sultanate, known for its spiritual and historical significance.',
            'Keris Pusaka Keraton', 'Galeri, Hotel Royal Ambarrukmo', 'Sebuah keris pusaka dari Kesultanan Yogyakarta yang dikenal karena nilai spiritual dan sejarahnya.',
            '“王宫传家宝克里斯”', '画廊, 皇家安巴鲁克莫酒店', '来自日惹苏丹国的传家宝匕首，以其精神和历史价值而闻名。',
            '「王宮の家宝のクリス」', 'ギャラリー, ロイヤルアンバルクモホテル', 'ジョグジャカルタ王国の伝統的な短剣で、精神的および歴史的意義で知られています。',
            '“왕궁의 유물 크리스”', '갤러리, 로얄 암바루크모 호텔', '족자카르타 술탄국의 유물 단검으로, 그 영적 및 역사적 의미로 유명합니다。',
            'Крис "Керис Пусака"', 'Галерея, Отель Роял Амбаррукмо', 'Наследственный кинжал султаната Джокьякарты, известный своим духовным и историческим значением.',
            'Kris Pusaka del Palacio Real', 'Galería, Hotel Royal Ambarrukmo', 'Un puñal hereditario del sultanato de Yogyakarta, conocido por su significado espiritual e histórico.',
            'Keris Pusaka van het Koninklijk Paleis', 'Galerij, Royal Ambarrukmo Hotel', 'Een erfgenaamd dolk uit het sultanaat Yogyakarta, bekend om zijn spirituele en historische betekenis.'),

            -- Lukisan Perjalanan Sultan
            (UUID(), JSON_ARRAY('https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'), '', 4, 160,
            'Painting "Journey of the Sultan"', 'Corridor, Royal Ambarrukmo Hotel', 'A historical painting depicting the journey of Sultan Hamengkubuwono IX during Indonesia''s independence struggle.',
            'Lukisan Perjalanan Sultan', 'Koridor, Hotel Royal Ambarrukmo', 'Lukisan sejarah yang menggambarkan perjalanan Sultan Hamengkubuwono IX selama perjuangan kemerdekaan Indonesia.',
            '“苏丹旅行”画作', '走廊, 皇家安巴鲁克莫酒店', '描绘印度尼西亚独立斗争期间苏丹哈门库布沃诺九世旅程的历史画作。',
            '「スルタンの旅」絵画', '廊下, ロイヤルアンバルクモホテル', 'インドネシアの独立闘争中のスルタン・ハメンクブウォノ IX の旅を描いた歴史的絵画。',
            '“술탄의 여행” 회화', '복도, 로얄 암바루크모 호텔', '인도네시아 독립 투쟁 중 술탄 하멩쿠부워노 IX의 여행을 묘사한 역사적인 회화.',
            'Картина "Путешествие султана"', 'Коридор, Отель Роял Амбаррукмо', 'Историческая картина, изображающая путешествие султана Хаменкубувоно IX во время борьбы Индонезии за независимость.',
            'Pintura "Viaje del Sultán"', 'Pasillo, Hotel Royal Ambarrukmo', 'Una pintura histórica que representa el viaje del Sultan Hamengkubuwono IX durante la lucha por la independencia de Indonesia.',
            'Schilderij "Reis van de Sultan"', 'Gang, Royal Ambarrukmo Hotel', 'Een historische schilderij die de reis van Sultan Hamengkubuwono IX tijdens de Indonesische onafhankelijkheidsstrijd afbeeldt.')

        `);
        

        console.log('Migrasi up berhasil untuk semua tabel.');
    } catch (error) {
        console.error('Error saat migrasi up:', error);
    } finally {
        db.end();
    }
}

migrateUp();

