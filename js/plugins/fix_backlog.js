(function() {
  const _addMessageBacklog = Game_System.prototype.addMessageBacklog;
  const _setLanguage = ConfigManager.setLanguage;

  // Переопределяем функцию смены языка
  ConfigManager.setLanguage = function(lang) {
    // Удалим последнее сообщение перед применением языка
    if ($gameSystem && $gameSystem._messageBacklog && $gameSystem._messageBacklog.length > 0) {
      $gameSystem._messageBacklog.pop();
    }

    if (typeof _setLanguage === 'function') {
      _setLanguage.call(this, lang);
    } else {
      this.language = lang; // если нет родной функции — напрямую
    }
  };

  // Обновлённая логика добавления в backlog
  Game_System.prototype.addMessageBacklog = function(text) {
    if (!this.isMessageBacklogLoggingEnabled()) return;
    text = this.convertMessageBacklogText(text);

    const normalize = function(str) {
      return str
        .replace(/\\[A-Z]+\[.*?\]/gi, '')
        .replace(/\\[A-Z]+/gi, '')
        .replace(/[\s\n\r]+/g, '')
        .trim()
        .toLowerCase();
    };

    const backlog = this._messageBacklog;
    const newNorm = normalize(text);

    if (backlog && backlog.length > 0) {
      for (let i = backlog.length - 1; i >= 0; i--) {
        const norm = normalize(backlog[i]);
        if (norm === newNorm) {
          backlog[i] = text;
          return;
        }
      }
    }

    backlog.push(text);

    while (backlog.length > Yanfly.Param.MsgBacklogMaxEntries) {
      backlog.shift();
    }
  };
})();
