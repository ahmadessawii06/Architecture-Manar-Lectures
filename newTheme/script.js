
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('weeks-container');
    const totalLecturesBadge = document.getElementById('total-lectures');

    // Fetch and render data
    fetch('../data/data.json')
        .then(res => res.json())
        .then(data => {
            if (totalLecturesBadge) {
                totalLecturesBadge.textContent = `${data.length} Lectures`;
            }

            const lecturesPerWeek = 3;
            const weeks = [];
            for (let i = 0; i < data.length; i += lecturesPerWeek) {
                weeks.push(data.slice(i, i + lecturesPerWeek));
            }

            let htmlContent = '';

            weeks.forEach((week, weekIndex) => {
                const weekNum = String(weekIndex + 1).padStart(2, '0');
                
                let weekHtml = `
                <div class="week-block">
                    <div class="week-label-col">
                        <span class="week-label-text">Week${weekNum}</span>
                    </div>
                    <div class="week-content">
                `;

                week.forEach((lecture) => {
                    const isHoliday = lecture.title.toLowerCase().includes('no lecture') || lecture.title.toLowerCase().includes('holiday') || lecture.title.toLowerCase().includes('no-lecture');
                    const isAlert = lecture.link.startsWith('javascript:');
                    
                    if (isHoliday) {
                        weekHtml += `
                        <div class="lecture-card lecture-card--holiday">
                            <div class="lecture-number">
                                <span class="lecture-num-badge lecture-num-badge--holiday">${lecture.lecture_number}</span>
                            </div>
                            <div class="lecture-info">
                                <h3 class="lecture-title">🌸 ${lecture.title}</h3>
                                <div class="lecture-meta">
                                    <div class="meta-item chapter"><i class="fa-solid fa-calendar-xmark"></i> No slides</div>
                                    <div class="meta-item date"><i class="fa-solid fa-calendar-days"></i> ${lecture.date === '0000/00/00' ? 'Holiday' : lecture.date}</div>
                                </div>
                            </div>
                            <div class="watch-btn-wrap">
                                <button class="watch-btn watch-btn--holiday" 
                                    onclick="${isAlert ? lecture.link.replace('javascript:', '') : "alert('No lecture today!')"}">
                                    <i class="fa-solid fa-face-smile-wink"></i> No Lecture!
                                </button>
                            </div>
                        </div>
                        `;
                    } else {
                        weekHtml += `
                        <div class="lecture-card">
                            <div class="lecture-number">
                                <span class="lecture-num-badge">${lecture.lecture_number}</span>
                            </div>
                            <div class="lecture-info">
                                <h3 class="lecture-title">${lecture.title}</h3>
                                <div class="lecture-meta">
                                    <div class="meta-item chapter"><i class="fa-solid fa-book-open"></i> ${lecture.slides_numbers}</div>
                                    <div class="meta-item date"><i class="fa-solid fa-calendar-days"></i> ${lecture.date}</div>
                                </div>
                            </div>
                            <div class="watch-btn-wrap">
                                ${lecture.link ? `
                                <a class="watch-btn" href="${lecture.link}" target="_blank" rel="noopener">
                                    <i class="fa-solid fa-circle-play"></i> Watch Now
                                </a>` : `
                                <button class="watch-btn" style="opacity:0.5; cursor:not-allowed;" onclick="alert('Link not available for this lecture yet.')">
                                    <i class="fa-solid fa-circle-play"></i> Not Available
                                </button>
                                `}
                            </div>
                        </div>
                        `;
                    }
                });

                weekHtml += `
                    </div>
                </div>
                `;

                htmlContent += weekHtml;
            });

            container.innerHTML = htmlContent;
        })
        .catch(err => {
            console.error("Error loading lectures JSON:", err);
            container.innerHTML = `<div style="text-align:center; padding: 2rem; color: red;">Error loading lectures. Please check if data/data.json exists.</div>`;
        });
});
