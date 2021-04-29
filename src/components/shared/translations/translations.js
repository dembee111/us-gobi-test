export const translateToFrench = (text) => {
  const frenchTranslations = {
    'Chest width': 'Largeur de poitrine',
    'Sleeve width': 'Largeur des manches',
    'Sleeve length': 'Longueur des manches',
    'Shoulder width': "Largeur d'épaule",
    'Body length': 'Longueur du corps',
    'Hip width': 'Largeur des hanches',
    'Waist width': 'Largeur de la taille',
    'Thigh width': 'Largeur des cuisses',
    'Body front length': "Longueur de l'avant du corps",
    'Body back length': 'Longueur du dos',
    Length: 'Longueur',
    Width: 'Largeure',
    'Fringe length': 'Longueur de frange',
    'FREE-SIZE': 'Taille libre',
    'Size guide': 'Guide des tailles',
    'Add to cart': 'Ajouter au panier',
    'Sold Out': 'Épuisé',
  };
  const frenchTranslation = frenchTranslations[text];
  if (frenchTranslation === undefined) {
    return text;
  }
  return frenchTranslation;
};
