document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS DOS COMPONENTES (Arrays de Objetos) ---
    
    const pinsData = [
        { title: "Crânio e Rosa Blackwork", style: "blackwork", img: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=600&q=80" },
        { title: "Leão Geométrico", style: "fineline", img: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=600&q=80" },
        { title: "Dragão Oriental Tradicional", style: "oriental", img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80" },
        { title: "Retrato Realista", style: "realismo", img: "https://images.unsplash.com/photo-1590246814884-570aafd3346f?auto=format&fit=crop&w=600&q=80" },
        { title: "Serpente Dark", style: "blackwork", img: "https://images.unsplash.com/photo-1565058382822-2616f8cc59c1?auto=format&fit=crop&w=600&q=80" },
        { title: "Botânica Delicada", style: "fineline", img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80" }
    ];

    const testimonialsData = [
        { text: "A melhor experiência de tattoo da minha vida! O estúdio é impecável e a arte ficou infinitamente melhor do que eu imaginava.", author: "Carlos Eduardo" },
        { text: "Atendimento incrível e traços extremamente finos e precisos. A cicatrização foi super rápida!", author: "Mariana Silva" },
        { text: "Profissionalismo do início ao fim. O sistema de agendamento e criação do projeto autoral facilitou tudo.", author: "Lucas Mendes" }
    ];

    const faqData = [
        { question: "Como funciona o orçamento e agendamento?", answer: "Você preenche o formulário informando sua ideia, e nossa equipe entra em contato via WhatsApp com uma estimativa e opções de datas." },
        { question: "Os materiais utilizados são seguros?", answer: "Sim! Utilizamos exclusivamente materiais 100% descartáveis e tintas regulamentadas pela ANVISA." },
        { question: "Vocês fazem cobertura de tatuagens antigas (Cover-up)?", answer: "Sim! Nossos especialistas avaliam a tattoo antiga e criam um projeto exclusivo capaz de cobri-la perfeitamente." }
    ];

    // --- 2. RENDERIZAÇÃO DA GALERIA PINTEREST ---
    
    const galleryGrid = document.getElementById('pinterest-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderGallery(filter = 'todos') {
        galleryGrid.innerHTML = '';
        const filteredData = filter === 'todos' ? pinsData : pinsData.filter(pin => pin.style === filter);
        
        filteredData.forEach(pin => {
            const card = document.createElement('div');
            card.className = 'pin-card';
            card.innerHTML = `
                <img src="${pin.img}" alt="${pin.title}">
                <div class="pin-overlay">
                    <button class="pin-save-btn">Salvar Ideia</button>
                    <div class="pin-info">
                        <h4>${pin.title}</h4>
                        <span>Estilo: ${pin.style.toUpperCase()}</span>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    renderGallery();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });

    // --- 3. CARROSSEL DE DEPOIMENTOS ---

    const carouselWrapper = document.getElementById('carousel-wrapper');
    let currentSlide = 0;

    function renderTestimonials() {
        carouselWrapper.innerHTML = testimonialsData.map(item => `
            <div class="testimonial-card">
                <p class="testimonial-text">"${item.text}"</p>
                <div class="testimonial-author">- ${item.author}</div>
            </div>
        `).join('');
    }

    renderTestimonials();

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialsData.length;
        updateCarousel();
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
        updateCarousel();
    });

    function updateCarousel() {
        carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // --- 4. ACORDEÃO FAQ ---

    const faqAccordion = document.getElementById('faq-accordion');

    function renderFAQ() {
        faqAccordion.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item ${index === 0 ? 'active' : ''}">
                <button class="accordion-header">
                    <span>${item.question}</span>
                    <span class="icon">+</span>
                </button>
                <div class="accordion-body">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        const headers = faqAccordion.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
            });
        });
    }

    renderFAQ();

    // --- 5. ACESSIBILIDADE (FONTE E CONTRASTE COM LIMITES) ---

    let currentFontSize = 16;
    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');
    const btnContrast = document.getElementById('btn-toggle-contrast');

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
});
