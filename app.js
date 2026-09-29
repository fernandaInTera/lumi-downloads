async function loadReleases() {
  try {
    const response = await fetch('./releases.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Metadata unavailable');
    const data = await response.json();
    for (const card of document.querySelectorAll('[data-slug]')) {
      const release = data.releases[card.dataset.slug];
      const date = release?.updatedAt ? new Date(release.updatedAt) : null;
      card.querySelector('.updated').textContent = date && !Number.isNaN(date.getTime())
        ? `${new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Manaus', dateStyle: 'short' }).format(date)} às ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Manaus', timeStyle: 'short' }).format(date)}`
        : 'Sem publicação disponível';
      if (date) card.querySelector('.updated').title = 'Horário de Manaus (AM), UTC−4';
      if (release?.size) card.querySelector('.size').textContent = `${(release.size / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB · APK`;
    }
  } catch {
    for (const field of document.querySelectorAll('.updated')) field.textContent = 'Não foi possível consultar';
    document.querySelector('#status').textContent = 'As datas estão indisponíveis agora. Você pode consultar a última atualização em “Detalhes da versão”.';
  }
}
loadReleases();
