import React, { PropTypes } from 'react';
import Radium from 'radium';
import ReactMarkdown from 'react-markdown';
import { Highlighter } from 'containers';
import RenderFilePDF from './RenderFilePDF';
import RenderFilePPT from './RenderFilePPT';
import RenderFileDoc from './RenderFileDoc';

let styles;

export const RenderFile = React.createClass({
	propTypes: {
		file: PropTypes.object,
	},

	render() {
		const file = this.props.file || {};

		switch (file.type) {
		case 'text/markdown': 
			return (
				<div id={'content-wrapper'} className={'pub-body'} style={styles.pubBody}>
					<Highlighter />
					<ReactMarkdown source={file.content} />
				</div>
			);
		case 'image/png':
		case 'image/jpg': // Is this ever actually used?
		case 'image/jpeg':
		case 'image/gif':
			return <img alt={file.name} src={file.url} style={{ maxWidth: '100%' }} />;
		case 'application/pdf':
			return (
				<div id={'content-wrapper'}>
					<Highlighter />
					<RenderFilePDF file={file} />
				</div>
				
			);
		case 'application/vnd.ms-powerpoint':
		case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
			return <RenderFilePPT file={file} />;
		case 'application/msword':
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return <RenderFileDoc file={file} />;
		default: 
			return (
				<div className={'pt-callout'}>
					<p>Can not render this file. Click to download the file in your browser.</p>
					<a href={file.url}><button className={'pt-button'}>Click to Download</button></a>
				</div>
			);
		}
	}

});

export default Radium(RenderFile);

styles = {
	container: {
		position: 'relative',
	},
	pubBody: {
		padding: '0em 1.25em',
		fontFamily: 'serif',
		lineHeight: '1.6em',
		fontSize: '1.2em',
		color: '#333',
		maxWidth: '700px',
	},
};
