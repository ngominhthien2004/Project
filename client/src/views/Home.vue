<template>
  <div class="home">
    <div class="banner">
      <h1>Thế Giới Truyện Tranh</h1>
      <p>Khám phá hàng ngàn bộ truyện tranh hot nhất</p>
    </div>

    <div class="container">
      <div class="section-header">
        <h2>Truyện Mới Cập Nhật</h2>
        <div class="filter-buttons">
          <button 
            :class="{ active: selectedGenre === 'all' }" 
            @click="filterByGenre('all')"
          >
            Tất cả
          </button>
          <button 
            :class="{ active: selectedGenre === 'Action' }" 
            @click="filterByGenre('Action')"
          >
            Action
          </button>
          <button 
            :class="{ active: selectedGenre === 'Fantasy' }" 
            @click="filterByGenre('Fantasy')"
          >
            Fantasy
          </button>
          <button 
            :class="{ active: selectedGenre === 'Manhwa' }" 
            @click="filterByGenre('Manhwa')"
          >
            Manhwa
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="comics-grid">
        <div v-for="comic in filteredComics" :key="comic._id" class="comic-card">
          <div class="comic-image">
            <img :src="getComicImage(comic.coverImage)" :alt="comic.title" />
            <div class="comic-rating">
              <span>⭐ {{ comic.rating }}</span>
            </div>
            <div class="comic-status" :class="getStatusClass(comic.status)">
              {{ comic.status }}
            </div>
          </div>
          <div class="comic-info">
            <h3 class="comic-title">{{ comic.title }}</h3>
            <p class="comic-author">{{ comic.author }}</p>
            <div class="comic-genres">
              <span v-for="genre in comic.genre.slice(0, 2)" :key="genre" class="genre-tag">
                {{ genre }}
              </span>
            </div>
            <div class="comic-stats">
              <span>📖 {{ comic.chapters }} chương</span>
              <span>👁️ {{ formatViews(comic.views) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      comics: [],
      loading: true,
      error: null,
      selectedGenre: 'all'
    };
  },
  computed: {
    filteredComics() {
      if (this.selectedGenre === 'all') {
        return this.comics;
      }
      return this.comics.filter(comic => comic.genre.includes(this.selectedGenre));
    }
  },
  mounted() {
    this.fetchComics();
  },
  methods: {
    async fetchComics() {
      try {
        this.loading = true;
        const response = await axios.get('/api/comics');
        this.comics = response.data.data;
        this.loading = false;
      } catch (err) {
        this.error = 'Không thể tải danh sách truyện. Vui lòng thử lại sau.';
        this.loading = false;
        console.error('Error fetching comics:', err);
      }
    },
    filterByGenre(genre) {
      this.selectedGenre = genre;
    },
    getComicImage(image) {
      return image || 'https://via.placeholder.com/200x280?text=No+Image';
    },
    formatViews(views) {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
      }
      return views;
    },
    getStatusClass(status) {
      return status === 'Đang cập nhật' ? 'updating' : 'completed';
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.banner h1 {
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.banner p {
  font-size: 1.2em;
  opacity: 0.9;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-header h2 {
  color: #333;
  font-size: 1.8em;
  margin: 0;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 10px 20px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.filter-buttons button:hover,
.filter-buttons button.active {
  background: #667eea;
  color: white;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
}

.error {
  color: #e74c3c;
}

.comics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.comic-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.comic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.comic-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #f0f0f0;
}

.comic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comic-rating {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
}

.comic-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
}

.comic-status.updating {
  background: #27ae60;
  color: white;
}

.comic-status.completed {
  background: #3498db;
  color: white;
}

.comic-info {
  padding: 15px;
}

.comic-title {
  margin: 0 0 8px 0;
  font-size: 1.1em;
  color: #333;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4em;
}

.comic-author {
  color: #666;
  font-size: 0.9em;
  margin: 0 0 10px 0;
}

.comic-genres {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.genre-tag {
  background: #e8eaf6;
  color: #5c6bc0;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 500;
}

.comic-stats {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.85em;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .banner h1 {
    font-size: 1.8em;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .comics-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
</style>
