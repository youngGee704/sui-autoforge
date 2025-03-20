import Image from "next/image";

export default function CryptoIcons() {
  const radius = 140; // Reduced radius for closer positioning
  const icons = [
    {
      src: "https://cdn3d.iconscout.com/3d/premium/thumb/sui-coin-3d-icon-download-in-png-blend-fbx-gltf-file-formats--crypto-cryptocurrency-pack-science-technology-icons-7479564.png",
      alt: "Sui Icon",
      angle: 0,
    },
  ];

  return (
    <div className="relative w-full h-[500px] md:h-full flex justify-center items-center">
      {icons.map((icon, index) => {
        const radians = (icon.angle * Math.PI) / 180; // Convert angle to radians
        const x = radius * Math.cos(radians); // Calculate x position
        const y = radius * Math.sin(radians); // Calculate y position

        return (
          <div
            key={index}
            className="absolute transform transition-transform duration-300 hover:scale-110"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={80} // Fixed width
              height={80} // Fixed height
              className="object-contain" // Maintain aspect ratio
            />
          </div>
        );
      })}
    </div>
  );
}