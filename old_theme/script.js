document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.lectures-container');
    const lectureCountEl = document.querySelector('.lecture-count');

    fetch('../data/data.json')
        .then(res => res.json())
        .then(data => {
            // Update lecture count
            const realLectures = data.filter(l => !isHoliday(l));
            if (lectureCountEl) {
                lectureCountEl.textContent = `${realLectures.length} Lectures`;
            }

            let html = '';
            data.forEach(lecture => {
                if (isHoliday(lecture)) {
                    html += buildHolidayCard(lecture);
                } else {
                    html += buildLectureCard(lecture);
                }
            });
            container.innerHTML = html;
        })
        .catch(err => {
            console.error('Failed to load lectures:', err);
            container.innerHTML = '<p style="color:red;text-align:center">Failed to load lectures data.</p>';
        });

    function isHoliday(lecture) {
        const t = lecture.title.toLowerCase();
        return t.includes('no lecture') || t.includes('no-lecture') || t.includes('holiday');
    }

    function buildLectureCard(lecture) {
        const isAlert = lecture.link && lecture.link.startsWith('javascript:');
        let btnHtml;
        if (!lecture.link) {
            btnHtml = `<button class="watch-btn" style="opacity:0.55;cursor:not-allowed;" onclick="alert('Link not available yet.')">
                <i class="fas fa-play-circle"></i> Watch Lecture Now
            </button>`;
        } else if (isAlert) {
            const alertCode = lecture.link.replace('javascript:', '');
            btnHtml = `<button class="watch-btn btn-pulse" onclick="${alertCode}">
                <i class="fas fa-play-circle"></i> Watch Lecture Now
            </button>`;
        } else {
            btnHtml = `<button class="watch-btn btn-pulse" onclick="window.open('${lecture.link}', '_blank')">
                <i class="fas fa-play-circle"></i> Watch Lecture Now
            </button>`;
        }

        return `
        <div class="lecture-card">
          <div class="lecture-header">
            <span class="lecture-number">${lecture.lecture_number}</span>
            <div class="lecture-info">
              <div class="lecture-title">${lecture.title}</div>
              <div class="lecture-meta">
                <span class="lecture-slides">
                  <i class="fas fa-file-powerpoint"></i>
                  <span class="zoom-pdf">${lecture.slides_numbers}</span>
                </span>
                <div class="lecture-date" style="color: #1a5fc1; font-weight: bold;">
                  <i class="fa fa-calendar" style="color: #1a5fc1;"></i> ${lecture.date}
                </div>
                <span class="lecture-type">
                  <i class="fas fa-video" style="color: #1a5fc1;"></i>
                  <span class="zoom-logo" style="color: #1a5fc1;">ZOOM</span>
                </span>
              </div>
            </div>
          </div>
          <div class="action-container">
            ${btnHtml}
          </div>
        </div>`;
    }

    function buildHolidayCard(lecture) {
        const isAlert = lecture.link && lecture.link.startsWith('javascript:');
        const alertCode = isAlert ? lecture.link.replace('javascript:', '') : `alert('No lecture today!')`;
        const dateDisplay = lecture.date === '0000/00/00' ? 'Holiday' : lecture.date;
        return `
        <div class="lecture-card" style="border-top-color: #f59e0b; border-left-color: #f59e0b; background: #fff9f0; opacity: 0.88;">
          <div class="lecture-header">
            <span class="lecture-number" style="background: linear-gradient(135deg, #f59e0b, #d97706);">${lecture.lecture_number}</span>
            <div class="lecture-info">
              <div class="lecture-title"><del>${lecture.title}</del></div>
              <div class="lecture-meta">
                <span class="lecture-slides">
                  <del><i class="fas fa-file-powerpoint"></i></del>
                  <span class="zoom-pdf"><del>${lecture.slides_numbers}</del></span>
                </span>
                <div class="lecture-date" style="color: #1a5fc1; font-weight: bold;">
                  <i class="fa fa-calendar" style="color: #1a5fc1;"></i> <del>${dateDisplay}</del>
                </div>
              </div>
            </div>
          </div>
          <div class="action-container">
            <button class="watch-btn btn-pulse" style="background: linear-gradient(to right, #f59e0b, #d97706); box-shadow: 0 8px 20px rgba(245,158,11,0.4);" onclick="${alertCode}">
              <i class="fas fa-play-circle"></i> <del>Watch Lecture Now</del>
            </button>
          </div>
        </div>`;
    }
});
