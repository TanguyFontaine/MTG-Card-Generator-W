// Super Type Constants
const LEGENDARY = 'Legendary';
const SNOW = 'Snow';
const BASIC = 'Basic';
const TOKEN = 'Token';

// Card Type Constants
const CREATURE = 'Creature';
const ARTIFACT = 'Artifact';
const ENCHANTMENT = 'Enchantment';
const PLANESWALKER = 'Planeswalker';
const INSTANT = 'Instant';
const SORCERY = 'Sorcery';
const LAND = 'Land';
const KINDRED = 'Kindred';
const BATTLE = 'Battle';

// Predefined card type arrays using constants
const SUPER_TYPES = [
    LEGENDARY,
    SNOW, 
    BASIC,
    TOKEN
];

const CARD_TYPES = [
    CREATURE,
    ARTIFACT, 
    ENCHANTMENT,
    PLANESWALKER,
    INSTANT,
    SORCERY,
    LAND,
    KINDRED,
    BATTLE
];

class CardTypeObj {
    constructor(superTypes = [], types = [], subTypes = '')
    {
        this.superTypes = Array.isArray(superTypes) ? superTypes : [];
        this.types = Array.isArray(types) ? types : [];
        this.subTypes = typeof subTypes === 'string' ? subTypes : '';
    }

    static newEmpty()
    {
        return new CardTypeObj([], [], '');
    }

    setTypes(types)
    {
        return new CardTypeObj(
            this.superTypes,
            Array.isArray(types) ? types : [],
            this.subTypes
        );
    }

    setSuperTypes(superTypes)
    {
        return new CardTypeObj(
            Array.isArray(superTypes) ? superTypes : [],
            this.types,
            this.subTypes
        );
    }

    setSubTypes(subTypes)
    {
        return new CardTypeObj(
            this.superTypes,
            this.types,
            subTypes
        );
    }

    addSuperType(superType)
    {
        if (!SUPER_TYPES.includes(superType) || this.superTypes.includes(superType))
            return this;

        return new CardTypeObj(
            this.superTypes.concat([superType]),
            this.types,
            this.subTypes
        );
    }

    addType(type)
    {
        if (!CARD_TYPES.includes(type) || this.types.includes(type))
            return this;
        
        return new CardTypeObj(
            this.superTypes,
            this.types.concat([type]),
            this.subTypes
        );
    }

    toString()
    {
        const allParts = [
            ...this.superTypes,
            ...this.types,
            this.subTypes.trim() // Remove beginning/trailing spaces
        ].filter(Boolean); // Filter out any empty strings
        
        return allParts.join(' ');
    }

    static fromString(typeString)
    {
        let result = CardTypeObj.newEmpty();

        if (!typeString || typeString.trim() === '')
            return result;
        
        const words = typeString.trim().split(/\s+/).filter(Boolean);
        
        for (let word of words)
        {
            if (SUPER_TYPES.includes(word))
                result = result.addSuperType(word);
            else if (CARD_TYPES.includes(word))
                result = result.addType(word); 
            else
                result = result.setSubTypes(result.subTypes + ' ' + word);
        }
        
        return result;
    }

    static getAvailableSuperTypes()
    {
        return [...SUPER_TYPES];
    }

    static getAvailableTypes()
    {
        return [...CARD_TYPES];
    }

    // removeType(type) not needed yet
    // removeSuperType(superType) not needed yet
}

export { 
    CardTypeObj, 
    SUPER_TYPES, 
    CARD_TYPES,
    LEGENDARY,
    SNOW,
    BASIC,
    TOKEN,
    CREATURE,
    ARTIFACT,
    ENCHANTMENT,
    PLANESWALKER,
    INSTANT,
    SORCERY,
    LAND,
    BATTLE,
    KINDRED
};