(fset 'transform-species-list
   (lambda (&optional arg) "Keyboard macro." (interactive "p") (kmacro-exec-ring-item (quote ("<option value='\346'></option>" 0 "%d")) arg)))

(fset 'format-author-list
   (lambda (&optional arg) "Keyboard macro." (interactive "p") (kmacro-exec-ring-item (quote ([1 67108896 5 134217847 39 62 25 60 47 111 112 116 105 111 110 62 1 60 111 112 116 105 111 110 32 118 108 backspace 97 108 117 101 61 39 5 14 1] 0 "%d")) arg)))
