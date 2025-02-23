export const shortContent = (content, words = 10) => {
  let wordsArray = content.split(" ");
  let shortenedWords = wordsArray.slice(0, words);
  let shortenedContent = shortenedWords.join(" ");
  return shortenedContent;
};
