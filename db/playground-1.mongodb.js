/* global use, db */
// MongoDB Playground - Trang web đọc truyện tranh
// Database và collection dành cho quản lý truyện tranh

// Select the database to use.
use('comicWebDB');

// Insert một số truyện tranh mẫu vào collection comics.
db.getCollection('comics').insertMany([
  { 
    'title': 'One Piece', 
    'author': 'Eiichiro Oda',
    'genre': ['Action', 'Adventure', 'Fantasy'],
    'chapters': 1100,
    'status': 'Đang cập nhật',
    'views': 1500000,
    'rating': 4.9,
    'description': 'Câu chuyện về hành trình của Luffy và băng Mũ Rơm',
    'coverImage': '/images/onepiece.jpg',
    'publishDate': new Date('2024-01-01T08:00:00Z'),
    'updatedAt': new Date('2026-01-15T10:00:00Z')
  },
  { 
    'title': 'Naruto', 
    'author': 'Masashi Kishimoto',
    'genre': ['Action', 'Adventure', 'Ninja'],
    'chapters': 700,
    'status': 'Hoàn thành',
    'views': 1200000,
    'rating': 4.8,
    'description': 'Câu chuyện về ninja Uzumaki Naruto',
    'coverImage': '/images/naruto.jpg',
    'publishDate': new Date('2023-06-01T08:00:00Z'),
    'updatedAt': new Date('2025-12-20T10:00:00Z')
  },
  { 
    'title': 'Solo Leveling', 
    'author': 'Chugong',
    'genre': ['Action', 'Fantasy', 'Manhwa'],
    'chapters': 179,
    'status': 'Hoàn thành',
    'views': 2000000,
    'rating': 5.0,
    'description': 'Hunter yếu nhất trở thành mạnh nhất',
    'coverImage': '/images/solo-leveling.jpg',
    'publishDate': new Date('2024-03-01T08:00:00Z'),
    'updatedAt': new Date('2025-11-30T10:00:00Z')
  },
  { 
    'title': 'Attack on Titan', 
    'author': 'Hajime Isayama',
    'genre': ['Action', 'Dark Fantasy', 'Horror'],
    'chapters': 139,
    'status': 'Hoàn thành',
    'views': 1800000,
    'rating': 4.7,
    'description': 'Nhân loại chiến đấu chống lại Titan',
    'coverImage': '/images/aot.jpg',
    'publishDate': new Date('2023-09-01T08:00:00Z'),
    'updatedAt': new Date('2024-04-15T10:00:00Z')
  },
  { 
    'title': 'Demon Slayer', 
    'author': 'Koyoharu Gotouge',
    'genre': ['Action', 'Supernatural', 'Historical'],
    'chapters': 205,
    'status': 'Hoàn thành',
    'views': 1600000,
    'rating': 4.8,
    'description': 'Tanjiro chiến đấu với quỷ để cứu em gái',
    'coverImage': '/images/demon-slayer.jpg',
    'publishDate': new Date('2024-01-10T08:00:00Z'),
    'updatedAt': new Date('2025-08-20T10:00:00Z')
  },
  { 
    'title': 'Tower of God', 
    'author': 'SIU',
    'genre': ['Action', 'Adventure', 'Manhwa'],
    'chapters': 550,
    'status': 'Đang cập nhật',
    'views': 950000,
    'rating': 4.6,
    'description': 'Leo lên tòa tháp bí ẩn để tìm kiếm người bạn',
    'coverImage': '/images/tog.jpg',
    'publishDate': new Date('2024-05-01T08:00:00Z'),
    'updatedAt': new Date('2026-01-10T10:00:00Z')
  },
  { 
    'title': 'My Hero Academia', 
    'author': 'Kohei Horikoshi',
    'genre': ['Action', 'Superhero', 'School'],
    'chapters': 405,
    'status': 'Đang cập nhật',
    'views': 1100000,
    'rating': 4.7,
    'description': 'Cậu bé không quirk trở thành hero vĩ đại nhất',
    'coverImage': '/images/mha.jpg',
    'publishDate': new Date('2024-02-01T08:00:00Z'),
    'updatedAt': new Date('2026-01-12T10:00:00Z')
  },
  { 
    'title': 'Chainsaw Man', 
    'author': 'Tatsuki Fujimoto',
    'genre': ['Action', 'Horror', 'Dark Fantasy'],
    'chapters': 180,
    'status': 'Đang cập nhật',
    'views': 1350000,
    'rating': 4.9,
    'description': 'Denji hợp thể với con quỷ cưa để trở thành Chainsaw Man',
    'coverImage': '/images/chainsaw-man.jpg',
    'publishDate': new Date('2024-07-01T08:00:00Z'),
    'updatedAt': new Date('2026-01-14T10:00:00Z')
  }
]);

// Tìm các truyện được cập nhật trong tháng 1/2026
const recentlyUpdated = db.getCollection('comics').find({
  updatedAt: { $gte: new Date('2026-01-01'), $lt: new Date('2026-02-01') }
}).count();

// In thông tin ra output
console.log(`${recentlyUpdated} truyện được cập nhật trong tháng 1/2026.`);

// Thống kê truyện theo thể loại và tính tổng lượt xem
// Sử dụng $unwind để tách mảng genre thành các document riêng biệt
db.getCollection('comics').aggregate([
  // Tách mảng genre
  { $unwind: '$genre' },
  // Nhóm theo thể loại và tính tổng views
  { $group: { 
      _id: '$genre', 
      totalViews: { $sum: '$views' },
      comicCount: { $sum: 1 },
      avgRating: { $avg: '$rating' }
    } 
  },
  // Sắp xếp theo tổng lượt xem giảm dần
  { $sort: { totalViews: -1 } }
]);
