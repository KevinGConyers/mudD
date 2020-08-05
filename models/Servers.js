module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Servers', {
		server_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		fight_channel: {
			type: DataTypes.STRING,
			defaultValue: "",
			allowNull: false,
        },
        wizards_tower: {
			type: DataTypes.STRING,
			defaultValue: "",
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};