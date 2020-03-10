const DEFAULT_SERVER = 'https://pacific-atoll-30835.herokuapp.com/';

export async function loginWithEmailAndPassword(emailIncome, passwordIncome) {
  try {
    let response = await fetch(`${DEFAULT_SERVER}rest-auth/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailIncome,
        password: passwordIncome,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function loginWithFacebook(token, appCode) {
  try {
    let response = await fetch(`${DEFAULT_SERVER}rest-auth/facebook/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: token,
        code: appCode,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function loginWithGoogle(token) {
  try {
    let response = await fetch(`${DEFAULT_SERVER}rest-auth/google/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: token,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function registration(
  usernameIncome,
  emailIncome,
  passwordIncome,
confirmPassword,
) {
  try {
    let response = await fetch(`${DEFAULT_SERVER}rest-auth/registration/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameIncome.replace(' ','_'),
        email: emailIncome,
        password1: passwordIncome,
        password2: confirmPassword,
      }),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(
  id,
  familyName,
  title,
  directTel,
  web,
  brokName,
  officeTel,
) {
  try {
    let response = await fetch(
      `${DEFAULT_SERVER}api/v1/profiles/${id}/update/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          family_name: familyName,
          title: title,
          direct_tel: directTel,
          website: web,
          brokerage_name: brokName,
          office_tel: officeTel,
        }),
      },
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}
