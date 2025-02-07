'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onHover?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width = 400,
  height = 400,
  priority = false,
  onHover = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      animate={onHover ? { scale: isLoading ? 1 : 1.05 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`object-cover duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </motion.div>
  );
} 