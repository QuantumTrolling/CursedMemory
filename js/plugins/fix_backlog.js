(function() {
  const _addMessageBacklog = Game_System.prototype.addMessageBacklog;
  Game_System.prototype.addMessageBacklog = function(text) {
    if (!this.isMessageBacklogLoggingEnabled()) return;
    text = this.convertMessageBacklogText(text);
    const backlog = this._messageBacklog;
    if (backlog && backlog.length > 0) {
      const last = backlog[backlog.length - 1];
      if (last === text) return; // пропускаем, если совпадает с последним
    }
    backlog.push(text);
    while (backlog.length > Yanfly.Param.MsgBacklogMaxEntries) {
      backlog.shift();
    }
  };
})();