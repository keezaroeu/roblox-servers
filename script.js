// Список игровых серверов Roblox нашего проекта
// Вы можете легко добавлять, удалять или изменять серверы здесь
const serversData = [
  {
    id: 1,
    title: "BloxCity RolePlay #1",
    category: "roleplay",
    categoryName: "RolePlay",
    desc: "Погрузись в реалистичную жизнь мегаполиса: работай полицейским, медиком или создай свою банду. Кастомные авто и скины.",
    players: 48,
    maxPlayers: 50,
    ping: "28ms",
    version: "v2.4",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival", // Замените на ссылку вашего плейса/VIP-сервера
    vip: true
  },
  {
    id: 2,
    title: "BloxCity RolePlay #2 (VIP)",
    category: "roleplay",
    categoryName: "RolePlay",
    desc: "Приватный сервер для съемок контента, ивентов и комфортной игры без очередей. Вход для участников нашего Discord.",
    players: 22,
    maxPlayers: 30,
    ping: "35ms",
    version: "v2.4",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    vip: true
  },
  {
    id: 3,
    title: "Arena PvP: Cyber Clash",
    category: "pvp",
    categoryName: "PvP / Арена",
    desc: "Динамичные командные сражения 5х5 и режим Deathmatch. Прокачивай арсенал, побеждай в дуэлях и занимай топ рейтинга.",
    players: 30,
    maxPlayers: 32,
    ping: "19ms",
    version: "Сезон 3",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    vip: false
  },
  {
    id: 4,
    title: "Outbreak: Зомби Выживание",
    category: "survival",
    categoryName: "Выживание",
    desc: "Постапокалипсис в мире Roblox. Строй баррикады, собирай припасы, крафти оружие и сдерживай волны зараженных ночью.",
    players: 18,
    maxPlayers: 24,
    ping: "42ms",
    version: "Hardcore",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    vip: false
  },
  {
    id: 5,
    title: "Mega Obby & Party Games",
    category: "minigames",
    categoryName: "Мини-игры",
    desc: "Сборник веселых паркур-трасс, гонок и аркадных мини-игр для компании друзей. Регулярные призы и бонусы для новичков.",
    players: 64,
    maxPlayers: 80,
    ping: "22ms",
    version: "v1.8",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    vip: false
  },
  {
    id: 6,
    title: "Anime Battlegrounds [Custom]",
    category: "pvp",
    categoryName: "PvP / Арена",
    desc: "Битвы с анимационными способностями, комбо-ударами и разрушаемой картой. Оттачивай скилл в поединках 1 на 1.",
    players: 38,
    maxPlayers: 40,
    ping: "31ms",
    version: "Update 7",
    link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    vip: true
  }
];

// Элементы страницы
const serversGrid = document.getElementById('servers-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalPlayersCount = document.getElementById('total-players-count');

let activeFilter = 'all';
let searchQuery = '';

// Функция подсчета общего онлайна
function updateTotalPlayers() {
  const total = serversData.reduce((sum, s) => sum + s.players, 0);
  if (totalPlayersCount) {
    totalPlayersCount.textContent = `ОНЛАЙН: ${total} ИГРОКОВ`;
  }
}

// Отображение карточек серверов
function renderServers() {
  const filtered = serversData.filter(server => {
    const matchesFilter = (activeFilter === 'all') || (server.category === activeFilter);
    const matchesSearch = server.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          server.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    serversGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <h3>Серверы не найдены</h3>
        <p>Попробуйте изменить поисковый запрос или выбрать другой фильтр.</p>
      </div>
    `;
    return;
  }

  serversGrid.innerHTML = filtered.map(server => {
    return `
      <div class="server-card">
        <div>
          <div class="card-top">
            <span class="server-tag tag-${server.category}">${server.categoryName}</span>
            <div class="server-players">
              <span class="live-dot"></span>
              <span>${server.players}/${server.maxPlayers}</span>
            </div>
          </div>

          <h3 class="server-title">${escapeHTML(server.title)}</h3>
          <p class="server-desc">${escapeHTML(server.desc)}</p>

          <div class="server-meta">
            <span>📶 Пинг: ${server.ping}</span>
            <span>🏷️ ${server.version}</span>
            ${server.vip ? '<span style="color: #fbbf24;">⭐ VIP-Сервер</span>' : ''}
          </div>
        </div>

        <div class="server-actions">
          <a href="${server.link}" target="_blank" rel="noopener noreferrer" class="btn btn-red btn-sm">
            ▶ Играть
          </a>
          <button class="btn btn-outline btn-sm copy-btn" data-link="${server.link}" title="Скопировать ссылку">
            📋 Ссылка
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Поиск
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderServers();
});

// Фильтры
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderServers();
  });
});

// Копирование ссылки на сервер
document.addEventListener('click', (e) => {
  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) {
    const link = copyBtn.dataset.link;
    navigator.clipboard.writeText(link).then(() => {
      showToast('✅ Ссылка на сервер скопирована в буфер обмена!');
    }).catch(() => {
      showToast('⚠️ Не удалось скопировать ссылку');
    });
  }
});

// Всплывающие уведомления
function showToast(message) {
  const box = document.getElementById('toast-box');
  if (!box) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = message;

  box.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

// Защита от XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Инициализация при загрузке
updateTotalPlayers();
renderServers();
