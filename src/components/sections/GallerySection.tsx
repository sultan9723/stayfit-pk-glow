import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    },
    {
      src: "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=800",
      alt: "Nutrition consultation and meal planning",
      category: "Nutrition"
    }
  ];

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const maxIndex = filteredImages.length - 1;
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : maxIndex);
    } else {
      setSelectedImage(selectedImage < maxIndex ? selectedImage + 1 : 0);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-warm-beige to-light-wood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Gallery Highlights
          </h2>
          <p className="text-xl text-very-dark-brown max-w-3xl mx-auto leading-relaxed">
            Take a visual tour of our state-of-the-art facilities, equipment, and the incredible 
            transformation journeys of our members.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`${
                activeCategory === category 
                  ? "bg-gradient-golden text-navy-primary font-semibold" 
                  : "border-golden-accent/30 text-golden-accent hover:bg-golden-accent/10"
              } transition-all duration-300`}
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
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-gradient-card shadow-elegant hover:shadow-golden transition-all duration-500 hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-very-dark-brown/0 group-hover:bg-very-dark-brown/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-golden-accent rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-very-dark-brown" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-very-dark-brown/80 to-transparent p-4">
                <span className="inline-block bg-golden-accent text-very-dark-brown text-xs font-semibold px-2 py-1 rounded">
                  {image.category}
                </span>
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
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-200"
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

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-hero-secondary">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;