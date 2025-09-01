import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL_API; 

export const loginApi = async (
  user: string,
  pass: string,
  captchaToken: string,
  captchaValue: number
) => {
  try {
    const payload = {
      user,
      pass,
      captcha: {
        token: captchaToken,
        value: captchaValue.toString(),
      },
    };

    console.log('Request Payload:', payload);

    const response = await axios.post(`${BASE_URL}/auth/login`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      withCredentials: true,
    });

    console.log('Login response:', response.data);

    if (response.data.status) {
      if (response.data.redirect_url) {
        window.location.href = `${BASE_URL}${response.data.redirect_url}`;
      } else {
        console.log('No redirect URL provided.');
      }
      return response.data;
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', error.response.data);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};

type CaptchaResponse = {
  img: string;
  key: string;
};

export const sendCaptchaApi = async (): Promise<CaptchaResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/sendCaptcha`, {
      headers: {
        Accept: '*/*',
      },
    });

    console.log('Captcha response:', response.data);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};

interface CaptchaValidationResponse {
  status: boolean;
  error?: string;
}

export const validateCaptchaApi = async (
  captchaToken: string, 
  captchaValue: number
): Promise<CaptchaValidationResponse> => {
  try {
    const formData = new FormData();
    formData.append('token', captchaToken);
    formData.append('value', captchaValue.toString());

    const response = await axios.post(`${BASE_URL}/auth/validateCaptcha`, formData, {
      headers: {
        'Accept': '*/*',
      },
      withCredentials: true,
    });

    console.log('Captcha validation response:', response.data);

    if (response.data.status) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Captcha validation failed');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error; 
  }
};


export const fetchLogout = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'Accept': '*/*',
        
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching logout:', error);
  }
};

export const fetchMenu = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/panel/menu`, {
      headers: {
        'Accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
};



export const fetchGeneralInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/person/general-info`, {
      headers: {
        'Accept': '*/*',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const fetchFooterExtraInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/footer-extra-info`, {
      headers: {
        'Accept': '*/*',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const fetchBaseInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/base-info`, {
      headers: {
        'Accept': '*/*',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const fetchProcessesTempCategoriesList = async () => {
  return await fetchBaseInfo();
};

interface SliderParams {
  page: number;
  size: number;
  category?: string;  
}

export const fetchSliderData = async (params: SliderParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/slider`, {
      params,
      headers: {
        'Accept': '*/*',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const fetchCategoriesList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/processes-temp/categories-list`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const fetchPagesUrls = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/pages-urls`, {
      headers: {
        'Accept': '*/*',
      },
      // withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};


export const fetchCnsLoginByMobile = async () => {
  try {
    const formData = new FormData();
    formData.append('name', 'cns_login_by_mobile');

    const response = await axios.post(`${BASE_URL}/simple_configs`, formData, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;  
  } catch (error) {
    console.error('Error fetching simple configs:', error);
    throw error;  
  }
};
export const fetchForgetPassByMobile = async () => {
  try {
    const formData = new FormData();
    formData.append('name', 'forget_pass_by_mobile');

    const response = await axios.post(`${BASE_URL}/simple_configs`, formData, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;  
  } catch (error) {
    console.error('Error fetching simple configs:', error);
    throw error;  
  }
};

export const fetchTablePageRowsNumber = async () => {
  try {
    const formData = new FormData();
    formData.append('name', 'table_page_rows_number');

    const response = await axios.post(`${BASE_URL}/simple_configs`, formData, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;  
  } catch (error) {
    console.error('Error fetching simple configs:', error);
    throw error;  
  }
};

export const fetchPersonCartableProcesses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/processes/person/cartable`, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching person cartable processes:', error);
    throw error;
  }
};

export const fetchPersonRecentProcesses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/processes/person/recent`, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching person cartable processes:', error);
    throw error;
  }
};

export const fetchTempProcesses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/processes-temp`, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching person cartable processes:', error);
    throw error;
  }
};

export const fetchProcessesTempIdentify = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/processes-temp/identify`, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching person cartable processes:', error);
    throw error;
  }
};


export const getProcessTemplateDetail = async (process_temp_code: number) => {
  try {
    const response = await axios.get(`https://my.oghaf.ir/api/processes_temp/detail/${process_temp_code}`, {
      headers: {
        'accept': '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error(' Error fetching process detail:', error);
    throw error;
  }
}
