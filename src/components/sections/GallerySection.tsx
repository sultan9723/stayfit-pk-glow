import { useState, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      alt: "Modern gym equipment and training area at StayFit.pk",
      category: "Equipment"
    },
    {
      src: "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=800",
      alt: "Group fitness class in progress",
      category: "Classes"
    },
    {
      src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
      alt: "MMA training session with professional coach",
      category: "MMA"
    },
    {
      src: "https://images.unsplash.com/photo-1571019612209-669c0214d02d?w=800",
      alt: "Cardio workout area with modern equipment",
      category: "Cardio"
    },
    {
      src: "https://images.unsplash.com/photo-1506629905606-b5625f6f8bb7?w=800",
      alt: "Peaceful yoga and meditation space",
      category: "Yoga"
    },
    {
      src: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
      alt: "Personal training session with certified trainer",
      category: "Training"
    },
    {
      src: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800",
      alt: "Strength training area with free weights",
      category: "Strength"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      alt: "Member success transformation result",
      category: "Results"
    }
  ];

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const maxIndex = filteredImages.length - 1;
    if (direction === "prev") {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : maxIndex);
    } else {
      setSelectedImage(selectedImage < maxIndex ? selectedImage + 1 : 0);
    }
  };

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-warm-beige to-light-wood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Gallery Highlights
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            Take a visual tour of our state-of-the-art facilities, equipment, and the 
            incredible transformation journeys of our members.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "primary" : "secondary"}
              size="sm"
              className={`btn-premium transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg" 
                  : "border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-gradient-card shadow-elegant hover:shadow-accent transition-all duration-500 hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay for Readability */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-primary/90 via-navy-primary/50 to-transparent p-4">
                <span className="inline-block bg-golden-accent text-navy-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {image.category}
                </span>
                <p className="mt-2 text-white-text text-sm font-medium">{image.alt}</p>
              </div>

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-navy-primary/0 group-hover:bg-navy-primary/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-golden-accent rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-very-dark-brown" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-very-dark-brown/95 backdrop-blur-md">
            <div className="relative max-w-4xl max-h-full mx-4">
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-golden-accent/20 hover:bg-golden-accent/40 rounded-full p-2 transition-colors duration-200"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-golden-accent/20 hover:bg-golden-accent/40 rounded-full p-3 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-golden-accent/20 hover:bg-golden-accent/40 rounded-full p-3 transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm">
                  {selectedImage + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="secondary" 
            size="md"
            className="btn-premium w-full md:w-auto border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;