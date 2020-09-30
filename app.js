new Vue({
    el: '#app',
    data: {
        running: true,
        playerLife: 100,
        monsterLife: 100,
        logs: []

    },
    computed: {
        hasResult() {
            return this.playerLife === 0 || this.monsterLife === 0
        }


    },
    methods: {
        startGame() {
            this.playerLife = 100,
                this.monsterLife = 100,
                this.running = true,
                this.logs = []

        },
        giveUpGame(){
            this.playerLife = 100,
            this.monsterLife = 100,
            this.running = false,
            this.logs = []

        },
        heal(min, max) {
            const heal = this.getRandom(min, max)

            // Vai pegar o menor valor entre os dois
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Player got ${heal} hp`, 'player')

        },

        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster')
        },
        attack(special) {
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster')
            if (this.playerLife > 0) {
                this.hurt('monsterLife', 5, 10, special, 'Player', 'Monster', 'player')
            }

        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min

            // Pode arrendondar tanto para cima quanto para baixo
            return Math.round(value)
        },
        hurt(prop, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)

            // Para evitar numeros negativos 
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} attacked ${target} with ${hurt}`, cls)

        },
        registerLog(text, cls) {
            // Vamos colocar na primeira posiçao do array
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false

        }

    }
})
