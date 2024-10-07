type Music = {
    name: string;
    author: string;
    description: string;
    urlAudio: string;
    image: string;
}

export const musics: Music[] = [
    {
        name: "Especialz",
        author: "Miura Jam",
        description: "Jujutsu Kaisen Season 2 Opening",
        urlAudio: "audios/audio1.mp3",
        image: "imagens/image01.jpg"
    },
    {
        name: "Otonoke",
        author: "Creepy Nuts",
        description: "DAN DA DAN Opening",
        urlAudio: "audios/audio2.mp3",
        image: "imagens/image02.jpg"
    },
    {
        name: "Blue bird",
        author: "Yoshiki Mizuno",
        description: "Naruto Shippuden Opening 3",
        urlAudio: "audios/audio3.mp3",
        image: "imagens/image03.jpg"
    }
]