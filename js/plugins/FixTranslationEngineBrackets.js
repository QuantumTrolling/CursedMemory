/*:
 * @plugindesc Real fix for SRD_TranslationEngine to allow [ and ] inside texts safely. No conflicts, no escapers needed. Full multilines support! | Author: ChatGPT
 * @author ChatGPT
 *
 * @help
 * Place this plugin BELOW SRD_TranslationEngine.
 */

(function() {
	if (!SRD || !SRD.TranslationEngine) {
	  console.error('FixTranslationEngineSafeBrackets: SRD_TranslationEngine not found!');
	  return;
	}
  
	SRD.TranslationEngine.loadNotetagTranslation = function(object, language) {
	  const regex = new RegExp(`<${language}\\s+Translation>([\\s\\S]*?)<\\/${language}\\s+Translation>`, 'gi');
	  let match;
	  while ((match = regex.exec(object.note)) !== null) {
		const block = match[1];
		const lines = block.split(/\r?\n/);
		
		let currentKey = null;
		let currentValue = '';
  
		lines.forEach(line => {
		  const keyLine = line.match(/^\[(.*?)\]:(.*)$/);
  
		  if (keyLine) {
			// Сохраняем предыдущую пару key:value, если была
			if (currentKey !== null) {
			  storeTranslation(object, language, currentKey, currentValue.trim());
			}
  
			currentKey = keyLine[1].trim();
			currentValue = keyLine[2].trim();
		  } else if (currentKey !== null) {
			// Это продолжение предыдущего текста на новой строке
			currentValue += '\n' + line.trim();
		  }
		});
  
		// Сохраняем последнюю запись
		if (currentKey !== null) {
		  storeTranslation(object, language, currentKey, currentValue.trim());
		}
	  }
	};
  
	function storeTranslation(object, language, key, value) {
	  if (!object.translations) object.translations = {};
	  if (!object.translations[language]) object.translations[language] = {};
	  object.translations[language][key] = value;
	}
  })();
  