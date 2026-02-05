"use client";

export default function VideoPlayer({ url, title }: { url: string, title: string }) {
    // Simple check for YouTube embed
    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.split("v=")[1] || url.split("/").pop();
            return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl(url);

    if (!url) return <div className="h-full flex items-center justify-center text-slate-500">Vídeo indisponível</div>;

    return (
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5">
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
            />
        </div>
    );
}
