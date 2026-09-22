const root = document.getElementById('root');

const style = document.createElement('style');
style.textContent = `
  :root { color: #172033; background: #f4f7fb; font-family: system-ui, -apple-system, sans-serif; }
  * { box-sizing: border-box; }
  body { margin: 0; }
  .shell { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; }
  aside { background: #12334d; color: #e7f5ff; padding: 28px 20px; }
  aside h1 { margin: 0 0 28px; font-size: 20px; }
  aside button { display: block; width: 100%; border: 0; border-radius: 6px; margin: 6px 0; padding: 10px 12px; color: #d6e8f4; background: transparent; text-align: left; cursor: pointer; }
  aside button.active, aside button:hover { background: #1d5878; color: #fff; }
  main { padding: 36px; max-width: 1100px; width: 100%; }
  h2 { margin: 0 0 8px; font-size: 28px; }
  .muted { color: #5c6b7a; }
  .timeline { margin-top: 28px; display: grid; gap: 14px; max-width: 740px; }
  .event { background: #fff; border: 1px solid #dbe5ec; border-left: 4px solid #2b7694; border-radius: 8px; padding: 18px 20px; }
  .event strong { display: block; margin-bottom: 6px; color: #12334d; }
  .event p { margin-bottom: 0; }
  @media (max-width: 720px) { .shell { grid-template-columns: 1fr; } aside { padding: 18px; } aside nav { display: flex; gap: 4px; overflow-x: auto; } aside button { min-width: 92px; } main { padding: 22px; } }
`;
document.head.append(style);

const sections = {
  '批次追溯': [['2026-09-22 08:10', '完成入塘登记', '南区 3 号塘，批次 YZ-2407'], ['2026-09-20 17:45', '记录水质巡检', '溶氧 6.8 mg/L，指标正常']],
  '迟到事件': [['2026-09-22 15:20', '补录投喂事件', '录入时间晚于业务时间 4 小时，已保留原始时间']],
  '历史快照': [['2026-09-18 09:00', '生成盘点快照', '快照包含批次状态与关联水质记录']],
};

function render(name = '批次追溯') {
  root.innerHTML = `<div class="shell"><aside><h1>水产养殖管理系统</h1><nav>${Object.keys(sections).map((item) => `<button class="${item === name ? 'active' : ''}" data-section="${item}">${item}</button>`).join('')}</nav></aside><main><h2>${name}</h2><div class="muted">按业务发生时间查看一批水产的完整经历</div><section class="timeline">${sections[name].map(([time, title, detail]) => `<article class="event"><strong>${title}</strong><div class="muted">${time}</div><p>${detail}</p></article>`).join('')}</section></main></div>`;
  root.querySelectorAll('[data-section]').forEach((button) => button.addEventListener('click', () => render(button.dataset.section)));
}

render();
