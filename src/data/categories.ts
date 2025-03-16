import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'mathematics',
    title: 'MATHEMATICS',
    description: 'Comprehensive collection of mathematical tools for calculations, conversions, and problem-solving',
    tools: [
      { id: 'calculator', title: 'Basic Calculator', description: 'Perform basic arithmetic operations' },
      { id: 'scientific-calculator', title: 'Scientific Calculator', description: 'Advanced mathematical and scientific calculations' }
    ]
  },
  {
    id: 'images',
    title: 'IMAGES',
    description: 'Complete suite of image editing, conversion, and optimization tools',
    tools: [
      { id: 'change-image-exposure', title: 'Image Exposure', description: 'Adjust image exposure and brightness levels' },
      { id: 'image-resizer', title: 'Image Resizer', description: 'Resize images while maintaining aspect ratio' },
      { id: 'image-cropper', title: 'Image Cropper', description: 'Crop images to desired dimensions' },
      { id: 'remove-background', title: 'Background Remover', description: 'Remove background from images automatically' }
    ]
  },
  {
    id: 'colors',
    title: 'COLORS',
    description: 'Color picker, tools for modifying or generating colors',
    tools: [
      { id: 'lighten-color', title: 'Lighten color', description: 'Make colors lighter' },
      { id: 'darken-color', title: 'Darken color', description: 'Make colors darker' }
    ]
  }
]; 