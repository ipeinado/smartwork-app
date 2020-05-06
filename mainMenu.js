module.exports = [
	{
    label: 'SmartWork',
    submenu: [
      { role: 'about' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Deshacer',
        role: 'undo' 
      },
      { 
        label: 'Rehacer',
        role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
]