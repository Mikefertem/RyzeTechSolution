// UI interactions: menu toggle, smooth scroll, form validation, whatsapp button, year
document.addEventListener('DOMContentLoaded', function () {
  // Menu toggle for small screens
  const btnMenu = document.getElementById('btnMenu');
  const nav = document.getElementById('mainNav');

  btnMenu && btnMenu.addEventListener('click', () => {
    if (!nav) return;
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '62px';
    nav.style.background = 'rgba(12,8,28,0.85)';
    nav.style.padding = '12px';
    nav.style.borderRadius = '10px';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // hide nav on mobile after click
      if (window.innerWidth < 900 && nav) nav.style.display = 'none';
    });
  });

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple form handling (demo)
 // (trecho para substituir a lógica do form existente)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const service = (formData.get('service') || '').trim();
    const message = (formData.get('message') || '').trim();

    if (!name || !phone) {
      alert('Por favor preencha seu nome e telefone.');
      return;
    }

    // mostra feedback simples (pode trocar por um loader)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, message })
      });

      const data = await resp.json();
      if (resp.ok && data.ok) {
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        form.reset();
      } else {
        console.error('Resposta do servidor:', data);
        alert('Erro ao enviar mensagem: ' + (data.error || 'Tente novamente mais tarde.'));
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      alert('Erro de rede ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
}


  // WhatsApp button (configurar número)
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    const phoneNumber = '5561XXXXXXXX'; // coloque seu número: país + DDD + número (somente dígitos)
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent('Olá, quero um orçamento para meu aparelho.');
      const url = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(url, '_blank');
    });
  }

  // If profile image missing, use placeholder
  const avatar = document.querySelector('.avatar img');
  if (avatar) {
    avatar.onerror = function () {
      avatar.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%232B1638" width="100%" height="100%"/><text x="50%" y="50%" font-size="32" fill="%23ffffff" dominant-baseline="middle" text-anchor="middle">Sua foto aqui</text></svg>';
    }
  }
});

fetch('http://localhost:3000/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});

// No seu server.js
// ...
// Carrega variáveis de ambiente do arquivo 'mail.env'
dotenv.config({ path: 'mail.env' }); // <--- Adicione esta opção
// ...