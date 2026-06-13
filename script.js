document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // CONFIGURAÇÃO DE ACESSIBILIDADE (FONTE E CONTRASTE)
    // ==========================================================================
    let currentFontSize = 16;
    const bodyElement = document.body;
    const btnContrast = document.getElementById('btn-contrast');
    const btnFontIncrease = document.getElementById('btn-font-increase');
    const btnFontDecrease = document.getElementById('btn-font-decrease');

    // Controle de Tamanho de Fonte
    function setFontSize(size) {
        if (size >= 12 && size <= 24) {
            currentFontSize = size;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    }

    btnFontIncrease.addEventListener('click', () => setFontSize(currentFontSize + 2));
    btnFontDecrease.addEventListener('click', () => setFontSize(currentFontSize - 2));

    // Modo de Alto Contraste
    btnContrast.addEventListener('click', () => {
        bodyElement.classList.toggle('high-contrast');
    });

    // ==========================================================================
    // DATA BINDING - COMPONENTE DE DEPOIMENTOS (ARRAY DE OBJETOS)
    // ==========================================================================
    const testimonialsData = [
        {
            quote: "Aumentamos nossa colheita de soja em 24% na região de Toledo logo na primeira safra com o acompanhamento de dados da equipe. Excelente suporte local.",
            author: "Gustavo Schmidt",
            role: "Produtor Rural - Toledo, PR"
        },
        {
            quote: "A gestão de custos que eles implementaram salvou nossa margem financeira durante a última estiagem. Essencial para quem quer escala e segurança.",
            author: "Ricardo Bortolini",
            role: "Grupo Agro Bortolini - Cascavel, PR"
        },
        {
            quote: "A aplicação em taxa variável nos gerou uma economia de 18% nos insumos. O investimento se pagou em menos de 6 meses de projeto.",
            author: "Mariana Costa",
            role: "Fazenda Primavera - Londrina, PR"
        }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    
    // Renderizar depoimentos
    testimonialsData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-quote">"${item.quote}"</p>
                <div class="testimonial-author">
                    <h4>${item.author}</h4>
                    <p>${item.role}</p>
                </div>
            </div>
        `;
        carouselTrack.appendChild(slide);
    });

    // Lógica do Carrossel
    let currentIndex = 0;
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');

    function updateCarousel() {
        const slideWidth = carouselTrack.querySelector('.carousel-item').clientWidth;
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonialsData.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = testimonialsData.length - 1; // Loop
        }
        updateCarousel();
    });

    // Ajustar carrossel ao mudar o tamanho da tela
    window.addEventListener('resize', updateCarousel);

    // ==========================================================================
    // DATA BINDING - COMPONENTE ACORDEÃO (ARRAY DE OBJETOS)
    // ==========================================================================
    const faqData = [
        {
            question: "Como funciona o diagnóstico gratuito da terra?",
            answer: "Um de nossos engenheiros agrônomos realiza uma análise do histórico de produtividade e dos mapas existentes da sua propriedade. A partir disso, identificamos os principais gargalos e apresentamos um plano inicial de ação estruturado."
        },
        {
            question: "A consultoria atende pequenas e médias propriedades?",
            answer: "Sim. Nossos planos são modulares e escaláveis de acordo com o tamanho do seu hectare. Atendemos desde médios produtores focados em expansão tecnológica até grandes grupos agrícolas do Paraná."
        },
        {
            question: "Quais culturas possuem suporte especializado?",
            answer: "Temos vasta experiência de mercado e foco absoluto na cadeia produtiva do Paraná, com ênfase em Soja, Milho, Trigo e culturas de cobertura de inverno integradas."
        },
        {
            question: "Em quanto tempo vejo os primeiros resultados operacionais?",
            answer: "A otimização de insumos e processos de gestão são perceptíveis já nos primeiros 60 dias de planejamento e execução assistida."
        }
    ];

    const faqAccordion = document.getElementById('faq-accordion');

    // Renderizar Acordeão
    faqData.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
        
        accordionItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-content-${index}">
                <span>${item.question}</span>
                <span class="accordion-icon">+</span>
            </button>
            <div id="faq-content-${index}" class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        
        faqAccordion.appendChild(accordionItem);
    });

    // Lógica de Ativação do Acordeão
    const headers = faqAccordion.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = this.nextElementSibling;
            const isOpen = currentItem.classList.contains('active');

            // Fecha todos os itens abertos
            faqAccordion.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Se o item clicado não estava aberto, abre-o
            if (!isOpen) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================================================
    // CAPTURA DE LEADS (EVENTO DO FORMULÁRIO)
    // ==========================================================================
    const leadForm = document.getElementById('lead-form');
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            hectares: document.getElementById('hectares').value
        };

        // Simulação de envio com disparo visual de alta fidelidade
        alert(`Obrigado, ${formData.name}! Seus dados foram enviados com sucesso para a equipe técnica da AgroParaná. Entraremos em contato em até 24 horas.`);
        leadForm.reset();
    });
});