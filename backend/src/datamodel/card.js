const cardsTableName = 'Cards';

class Card {
  constructor(id = 0, name = "", manaCost = "", type = "", spellDescription = "", flavorText = "", 
              frame = "", imageUrl = "", power = "", toughness = "")
  {
    this.id = id;
    this.name = name;
    this.manaCost = manaCost;
    this.type = type;
    this.spellDescription = spellDescription;
    this.flavorText = flavorText;
    this.frame = frame;
    this.imageUrl = imageUrl;
    this.power = power;
    this.toughness = toughness;
  }

    // Validation Methods
  validateName()
  {
    if (this.name == null || this.name.trim().length === 0) {
      return { isValid: false, error: "Card name is required" };
    }
    if (this.name.length > 120) {
      return { isValid: false, error: "Card name must be 120 characters or less" };
    }
    return { isValid: true };
  }

  validateManaCost()
  {
    // Check if mana cost is an array or valid string
    if (this.manaCost == null || typeof this.manaCost !== 'string' || this.manaCost.length > 120) {
      return { isValid: false, error: "Mana cost should be 30 characters or less" };
    }
    return { isValid: true };
  }

  validateFrame()
  {
    // Check if frame is a valid string
    if (this.frame == null || typeof this.frame !== 'string' || this.frame.length > 30) {
      return { isValid: false, error: "Frame should be 30 characters or less" };
    }
    return { isValid: true };
  }

  validatePowerToughness()
  {  
    if (this.power == null || typeof this.power !== 'string' || this.power.length > 10) {
      return { isValid: false, error: "Power must be 10 characters or less" };
    }
    if (this.toughness == null || typeof this.toughness !== 'string' || this.toughness.length > 10) {
      return { isValid: false, error: "Toughness must be 10 characters or less" };
    }
    return { isValid: true };
  }

  validateImageUrl()
  {
    if (this.imageUrl == null || this.imageUrl.length > 255) {
      return { isValid: false, error: "Image URL is too long" };
    }

    // Validate URL format
    try
    {
      if (this.imageUrl.length > 0 && !this.imageUrl.startsWith('data:') && !this.imageUrl.startsWith('http')) {
        return { isValid: false, error: "Invalid image URL format" };
      }
    }
    catch (e)
    {
      return { isValid: false, error: "Invalid image URL" };
    }

    return { isValid: true };
  }

  // Master validation method
  validate() {
    const validations = [
      this.validateName(),
      this.validateManaCost(),
      this.validateFrame(),
      this.validateImageUrl(),
      this.validatePowerToughness()
    ];

    const errors = validations.filter(v => !v.isValid).map(v => v.error);
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

export { Card, cardsTableName };