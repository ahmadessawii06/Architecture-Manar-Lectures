
document.addEventListener('DOMContentLoaded', () => {
    // Theme logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('light')) {
            html.classList.remove('light');
            html.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Fetch and render data
    fetch('data/data.json')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('weeks-container');
            const lecturesPerWeek = 3;
            
            // Group lectures into weeks
            const weeks = [];
            for (let i = 0; i < data.length; i += lecturesPerWeek) {
                weeks.push(data.slice(i, i + lecturesPerWeek));
            }

            let htmlContent = '';

            weeks.forEach((week, weekIndex) => {
                const weekNum = String(weekIndex + 1).padStart(2, '0');
                
                let weekHtml = `
                <div class="flex border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div class="w-24 md:w-32 bg-white dark:bg-slate-900 border-r-4 border-black flex items-center justify-center py-12 shrink-0">
                        <span class="vertical-text font-black text-4xl md:text-5xl tracking-tighter text-black dark:text-white uppercase">Week${weekNum}</span>
                    </div>
                    <div class="flex-1 p-4 md:p-8 space-y-6">
                `;

                week.forEach((lecture) => {
                    const isAlert = lecture.link.startsWith('javascript:');
                    
                    const watchButtonHtml = `
                    <button onclick="${isAlert ? lecture.link.replace('javascript:', '') : `window.open('${lecture.link}', '_blank')`}" 
                            class="w-full lg:w-48 bg-primary text-white rounded-full py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all">
                        <i class="fa-solid fa-circle-play"></i>
                        Watch Now
                    </button>
                    `;

                    weekHtml += `
                    <!-- Lecture ${lecture.lecture_number} -->
                    <div class="lecture-card rounded-xl p-6 bg-white dark:bg-slate-800 flex flex-col lg:flex-row items-center gap-6">
                        <div class="shrink-0">
                            <span class="bg-primary text-white h-12 w-12 flex items-center justify-center rounded-full font-bold text-xl">${lecture.lecture_number}</span>
                        </div>
                        <div class="flex-1 text-left">
                            <h3 class="text-xl font-bold text-on-surface dark:text-gray-100 mb-2">${lecture.title}</h3>
                            <div class="flex flex-wrap gap-6 mt-3">
                                <div class="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400">
                                    <i class="fa-solid fa-book-open"></i>
                                    ${lecture.slides_numbers}
                                </div>
                                <div class="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
                                    <i class="fa-solid fa-calendar-days"></i>
                                    ${lecture.date}
                                </div>
                            </div>
                        </div>
                        <div class="shrink-0 w-full lg:w-auto">
                            ${watchButtonHtml}
                        </div>
                    </div>
                    `;
                });

                weekHtml += `
                    </div>
                </div>
                `;

                htmlContent += weekHtml;
            });

            container.innerHTML = htmlContent;
        })
        .catch(err => console.error("Error loading lectures JSON:", err));
});
