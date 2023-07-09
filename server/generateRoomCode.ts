function generateUniqueSequence(existingSequences: string[]): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let sequence = '';
  
    // Generate a random 4-letter sequence
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      sequence += characters[randomIndex];
    }
  
    // Check for uniqueness against existing sequences
    if (existingSequences.includes(sequence)) {
      // If the sequence already exists, recursively call the function to generate a new one
      return generateUniqueSequence(existingSequences);
    }
  
    return sequence;
  }
  
  module.exports = 

{
    generateUniqueSequence
}