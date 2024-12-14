// เมื่อกดปุ่ม Login
document.getElementById("login-btn").addEventListener("click", loginWithSpotify);

function loginWithSpotify() {
  const clientId = 'your_client_id';  // ใช้ Client ID ที่ได้จาก Spotify Developer Dashboard
  const redirectUri = 'http://localhost:3000/callback'; // ใช้ Redirect URI ที่คุณตั้งค่า
  const scope = 'user-library-read playlist-read-private';  // ระบุ scope ที่ต้องการ

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

  window.location.href = authUrl;  // เปลี่ยนหน้าไปยังหน้า Login ของ Spotify
}

// เมื่อกดปุ่ม Show Songs
document.getElementById("show-songs-btn").addEventListener("click", showSongs);

function showSongs() {
  const accessToken = localStorage.getItem('access_token');  // ดึง Access Token จาก localStorage

  if (!accessToken) {
    alert('Please log in to Spotify first.');
    return;
  }

  // ส่งคำขอไปยัง Spotify API เพื่อดึงข้อมูล Playlist
  fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      displaySongs(data);  // แสดงเพลงที่ดึงมา
    })
    .catch(error => console.error('Error fetching songs:', error));
}

// ฟังก์ชันในการแสดงข้อมูลเพลง
function displaySongs(data) {
  const songsContainer = document.getElementById("songs-container");
  songsContainer.innerHTML = '';  // ลบเพลงที่แสดงอยู่เดิม

  // สร้างการ์ดสำหรับเพลงที่ดึงมา
  data.playlists.items.forEach(item => {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';
    songCard.innerHTML = `
      <img src="${item.images[0].url}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.owner.display_name}</p>
    `;
    songsContainer.appendChild(songCard);
  });
}

function loginWithSpotify() {
  const clientId = 'your_client_id';  // ใช้ Client ID ที่ได้จาก Spotify Developer Dashboard
  const redirectUri = 'http://localhost:3000/callback'; // ใช้ Redirect URI ที่คุณตั้งค่า
  const scope = 'user-library-read playlist-read-private';  // ระบุ scope ที่ต้องการ

  console.log("Redirecting to Spotify Login...");  // เพิ่มบรรทัดนี้เพื่อตรวจสอบว่าโค้ดทำงาน
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

  window.location.href = authUrl;  // เปลี่ยนหน้าไปยังหน้า Login ของ Spotify
}