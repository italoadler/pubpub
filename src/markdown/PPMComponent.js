import React, { PropTypes } from 'react';
import MDReactComponent from './MDReactComponent';

import abbr from 'markdown-it-abbr';
import emoji from 'markdown-it-emoji';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';

const handleIterate = function(Tag, props, children) {
  switch(Tag) {
  case 'table':
    props.className = 'table table-striped';
    break;
  case 'code':
    if (props['data-language']) {
      return <Tag {...props} dangerouslySetInnerHTML={{__html: window.hljs.highlight(props['data-language'], children[0]).value}} />
    };
    break;
  }
  return <Tag {...props}>{children}</Tag>;
}

const PPMComponent = React.createClass({
	propTypes: {
		markdown: PropTypes.string,
		assets: PropTypes.array,
		references: PropTypes.array,
	},

	getDefaultProps: function() {
		return {
			markdown: '',
			assets: [],
			references: [],
		};
	},

	render: function() {
		return (
			<MDReactComponent text={text}
				onIterate={handleIterate}
				markdownOptions={{ 
					typographer: true,
					linkify: true,
				}}
				plugins={[
					abbr,
					emoji,
					sub,
					sup,
				]} />
		);
	}
});

export default PPMComponent;
