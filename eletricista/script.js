document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populatePage(data);
            if (data.pricing.enableLoyaltyModal) {
                setupModal(data.pricing.loyaltyProgram);
            }
        });
});

function populatePage(data) {
    document.getElementById('site-title').textContent = data.site.title;
    document.getElementById('logo').textContent = data.site.logo;

    const navMenu = document.getElementById('nav-menu');
    data.navigation.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        li.appendChild(a);
        navMenu.appendChild(li);
    });

    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    const heroButton = document.getElementById('hero-button');
    heroButton.appendChild(document.createTextNode(data.hero.buttonText));
    heroButton.href = `https://wa.me/${data.hero.whatsapp}`;

    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('about-description').textContent = data.about.description;

    const aboutCards = document.getElementById('about-cards');
    data.about.cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="assets/img/card${index + 1}.png" alt="${card.title}">
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        `;
        aboutCards.appendChild(cardDiv);
    });

    document.getElementById('services-title').textContent = data.services.title;
    const servicesCards = document.getElementById('services-cards');
    data.services.cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="assets/img/card${index + 4}.png" alt="${card.title}">
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        `;
        servicesCards.appendChild(cardDiv);
    });

    document.getElementById('pricing-title').textContent = data.pricing.title;
    const pricingList = document.getElementById('pricing-list');
    data.pricing.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.description} - <span class="price-value">${item.price}</span>`;
        pricingList.appendChild(li);
    });

    document.getElementById('footer-copyright').innerHTML = data.footer.copyright;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

function toggleMenu() {
    const navUl = document.getElementById('nav-menu');
    navUl.classList.toggle('active');
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(13, 71, 161, 0.95)'; // Cor azul escuro
        header.style.boxShadow = '0 8px 30px rgba(0,0,0,0.7)';
    } else {
        header.style.background = 'rgba(13, 71, 161, 0.8)'; // Cor azul escuro
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    }
});

let count = 0;
const counterElement = document.getElementById('counter');
const target = 1532; // Número de clientes do eletricista
const interval = setInterval(() => {
    if (counterElement) {
        count += Math.ceil(target / 100);
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        counterElement.textContent = count.toLocaleString();
    }
}, 30);

window.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scroll = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
    }
});

let modalShown = false;
function setupModal(loyaltyProgramData) {
    const modal = document.getElementById('loyalty-modal');
    const modalContent = document.getElementById('loyalty-modal-content');

    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <h2>${loyaltyProgramData.title}</h2>
        <p>${loyaltyProgramData.description}</p>
        <button class="close-button">&times;</button>
    `;

    const closeButton = modalContent.querySelector('.close-button');

    if (closeButton) {
        closeButton.onclick = () => {
            modal.style.display = 'none';
            modal.classList.remove('modal-active');
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            modal.classList.remove('modal-active');
        }
    };

    window.addEventListener('scroll', () => {
        if (!modalShown && window.scrollY > 600) {
            modal.style.display = 'block';
            modal.classList.add('modal-active');
            modalShown = true;
        }
    });
}