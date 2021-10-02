const pool = require('../DBConnection/db');

exports.getDataById = async (profileSSN) => {
    const profileDataQuery = `SELECT prof.*, driv.*
                         FROM profiles as prof
                         FULL JOIN driving_licenses as driv
                         ON prof.driving_license = driv.license_id
                         WHERE prof.ssn = $1`;
    const profileDataValues = [profileSSN];
    const output = await pool.query(profileDataQuery, profileDataValues);

    return output.rows;
};

exports.getAllWantedStates = async () => {
    const postQuery = `SELECT wanted_state
                        FROM profiles`;
    const output = await pool.query(postQuery);

    return output.rows;
};

exports.getAllProfilesBasicData = async () => {
    const postQuery = `SELECT ssn as SSN, firstname, lastname, image_url, wanted_state
                        FROM profiles`;
    const output = await pool.query(postQuery);

    return output.rows;
};

exports.getWantedInfoById = async (profileSSN) => {
    const profileQuery = `SELECT firstname, lastname, wanted_state
                            FROM profiles
                            WHERE ssn = $1;`;
    const values = [profileSSN];

    return await pool.query(profileQuery, values);
};

exports.updateWantedStateById = async (profileSSN) => {
    const profileQuery = `UPDATE profiles
                        SET wanted_state = (wanted_state % 2) + 1
                        WHERE ssn = $1;`;
    const values = [profileSSN];
    
    await pool.query(profileQuery, values);
};