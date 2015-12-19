var mongoose  = require('mongoose');
var Schema    =  mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;


var journalSchema = new Schema({

	journalName: { type: String}, 
	subdomain: { type: String, required: true, index: true,  unique: true  },
	customDomain: { type: String, index: true,  unique: true, sparse: true  },
	journalLogoURL: { type: String}, 
	journalLogoThumbnailURL: { type: String}, 

	defaultLanguage: { type: String}, 
	createDate: {type: Date},
	
	admins: [{ type: ObjectId, ref: 'User' }],

	pubsFeatured: [{ type: ObjectId, ref: 'Pub' }],
	pubsSubmitted: [{ type: ObjectId, ref: 'Pub' }],
	
	design: { type: Schema.Types.Mixed },
	settings: { type: Schema.Types.Mixed },

});


module.exports = mongoose.model('Journal', journalSchema);