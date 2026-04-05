// 1. Hàm đổi hình nền
function changeBG(fileName) {
    const img = new Image();
    img.src = fileName;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${fileName}')`;
    };
}

// 2. Đồng hồ và lời chào (Sửa lỗi innerHTML)
function updateClock() {
    const now = new Date();
    const h = now.getHours();
    
    // Tự động chào theo giờ hệ thống
    let greet = "Chào buổi sáng! ";
    if (h >= 12 && h < 18) greet = "Nghỉ trưa thôi nào! ";
    else if (h >= 18) greet = "Buổi tối vui vẻ nhé! ";

    const greetElement = document.getElementById('greeting');
    if (greetElement) greetElement.innerHTML = greet; // Sửa lỗi hiện code thẻ span
    
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('full-date');
    
    if (timeEl) timeEl.innerText = now.toLocaleTimeString('vi-VN');
    if (dateEl) dateEl.innerText = now.toLocaleDateString('vi-VN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
}

// 3. Tab System (Fix lỗi chuyển màu nút tab)
function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// 4. Hẹn giờ - Sửa lỗi ID không khớp
let timerInterval;
function startTimer() {
    clearInterval(timerInterval);
    const minVal = parseInt(document.getElementById('minutes').value) || 0; // ID khớp HTML
    const secVal = parseInt(document.getElementById('seconds').value) || 0; // ID khớp HTML
    let total = minVal * 60 + secVal;

    if (total <= 0) {
        alert("Vui lòng nhập thời gian nha Hà Vy! ✨");
        return;
    }

    document.getElementById('timer-inputs').style.display = "none";
    const display = document.getElementById('timer-display');
    display.style.display = "block";

    timerInterval = setInterval(() => {
        if (total <= 0) {
            clearInterval(timerInterval);
            document.getElementById('alarm-sound').play();
            alert("Hết giờ rồi, nghỉ tay thôi nào! 🌸");
            resetTimer();
            return;
        }
        total--;
        let m = Math.floor(total / 60);
        let s = total % 60;
        display.innerText = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').style.display = "none";
    document.getElementById('timer-inputs').style.display = "flex";
    document.getElementById('minutes').value = "";
    document.getElementById('seconds').value = "";
}

// 5. Đếm ngày
function countDays() {
    const targetValue = document.getElementById('special-date').value;
    const resultEl = document.getElementById('day-result');
    const msgEl = document.getElementById('date-msg');
    if(!targetValue) return;

    const target = new Date(targetValue);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    
    resultEl.innerText = Math.abs(diffDays);
    if (diffDays > 0) msgEl.innerText = "ngày còn lại ✨";
    else if (diffDays < 0) msgEl.innerText = "ngày đã trôi qua 🌸";
    else msgEl.innerText = "chính là hôm nay! 🎉";
}

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
};