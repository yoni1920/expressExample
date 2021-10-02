const profiles = require('../Data/profiles');
const profileRepository = require('../Repositories/profileRepository');

// Wanted State Flags
const SUSPECT = 1;
const REQUESTED = 2;
const SAFE = 0;

// Sending profile data by id
exports.sendDataById = async (profileSSN) => {
    const profileData = (await profileRepository.getDataById(profileSSN))[0];

    return profileData ? profileDrivingReportData(profileData) : {};
};

// Format profile data
const profileDrivingReportData = (profileData) => {
    const drivingLicense = (profileDate.driving_license ? profileDate.driving_license : {});
   
    const dataToReturn = {
        profileId: profileData.prof_id,
        SSN: profileData.ssn,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phoneNumber: profileData.phone_number,
        address: profileData.address,
        wantedState: profileData.wanted_state,
        drivingLicense
    }

    return dataToReturn;
};

// Using temp data
exports.sendAllProfiles = () => {
    return profiles;
};

// Sending number of profiles that are suspects/requested
exports.sendNumberSuspectsRequested = async () => {
    let suspects = 0;
    let requested = 0;

    const profileData = await profileRepository.getAllWantedStates();

    profileData.forEach(({ wanted_state }) => {
        if (wanted_state === REQUESTED) {
            requested += 1;
        } else if (wanted_state === SUSPECT) {
            suspects += 1;
        }
    });

    return {
        suspects,
        requested
    };
};

// Send data of suspects/requested
exports.sendSuspectsRequested = async () => {
    let suspects = [];
    let requested = [];

    const profileData = await profileRepository.getAllProfilesBasicData();

    profileData.forEach(profile => {
        const { wanted_state } = profile;

        if (wanted_state === REQUESTED) {
            requested.push(profile);
        } else if (wanted_state === SUSPECT) {
            suspects.push(profile);
        }
    });

    return {
        suspects: profilesToBasicData(suspects),
        requested: profilesToBasicData(requested)
    };
};

// Help function
const profilesToBasicData = (profileData) => {
    const updatedProfiles = profileData.map(profile => {
        return {
            SSN: profile.ssn,
            firstname: profile.firstname,
            lastname: profile.lastname,
            imageURL: profile.image_url,
        };
    });

    return updatedProfiles;
};

// is profile a suspect by id
exports.sendIsSuspectById = async (profileSSN) => {
    const output = await profileRepository.getWantedInfoById(profileSSN);

    // const profile = profiles.find( ({ SSN }) => SSN === profileSSN);
    let dataToSend = {};

    if (output) {
        const profileToSend = output.rows[0];
        const isSuspect = ((profileToSend.wanted_state != SAFE) ? 'true' : 'false');
        
        dataToSend = {
            isSuspect,
            firstname: profileToSend.firstname,
            lastname: profileToSend.lastname
        }
    }

    return dataToSend;
};

// Update wanted state of profile
exports.updateWantedState = async (profileSSN) => {
    await profileRepository.updateWantedStateById(profileSSN);
};
