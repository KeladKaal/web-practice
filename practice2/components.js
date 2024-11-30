class MyAccessibleComponent extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Стили для доступности
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            :host {
                display: block;
                margin: 10px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                font-family: Arial, sans-serif;
            }
            h1, p {
                margin: 0;
                padding: 8px;
            }
            h1:focus, p:focus {
                outline: 2px solid #007BFF;
                outline-offset: 4px;
            }
        `;

        // Создаем содержимое компонента
        const container = document.createElement('div');
        const heading = document.createElement('h1');
        heading.setAttribute('tabindex', '0');
        heading.textContent = this.getAttribute('title') || 'Заголовок по умолчанию';

        const textParagraph = document.createElement('p');
        textParagraph.setAttribute('tabindex', '0');
        textParagraph.textContent = this.getAttribute('text') || 'Текст по умолчанию';

        // Функция для синтеза речи
        const speakText = (text) => {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        };

        heading.addEventListener('focus', () => speakText(heading.textContent));
        textParagraph.addEventListener('focus', () => speakText(textParagraph.textContent));

        container.appendChild(heading);
        container.appendChild(textParagraph);
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(container);
    }
}

customElements.define('my-accessible-component', MyAccessibleComponent);