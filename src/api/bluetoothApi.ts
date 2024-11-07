// src/api/bluetoothApi.ts
import axios from 'axios';
import { LoginInfo, BluetoothRegistryRequest, BluetoothRegistryResponse, OwnedBluetoothResponse, DetectionInfo } from '../types';

const BASE_URL = 'https://your-server.com/api/v1/bluetooth';

/**
 * 블루투스 기기 등록
 * @param loginInfo - 로그인 정보
 * @param deviceInfo - 디바이스 정보
 * @returns API 응답
 */
export const registerBluetoothDevice = async (
  loginInfo: LoginInfo,
  deviceInfo: BluetoothRegistryRequest
): Promise<BluetoothRegistryResponse> => {
  try {
    const response = await axios.post<BluetoothRegistryResponse>(`${BASE_URL}`, {
      loginInfo,
      request: deviceInfo,
    });
    return response.data;
  } catch (error) {
    console.error('블루투스 기기 등록 오류:', error);
    throw error;
  }
};

/**
 * 등록된 블루투스 기기 목록 조회
 * @param loginInfo - 로그인 정보
 * @returns API 응답
 */
export const getOwnedBluetoothDevices = async (
  loginInfo: LoginInfo
): Promise<OwnedBluetoothResponse> => {
  try {
    const response = await axios.get<OwnedBluetoothResponse>(`${BASE_URL}`, {
      params: {
        loginInfo,
      },
    });
    return response.data;
  } catch (error) {
    console.error('블루투스 기기 목록 조회 오류:', error);
    throw error;
  }
};

/**
 * 블루투스 기기 발견 정보 전송
 * @param loginInfo - 로그인 정보
 * @param detectionInfo - 발견 정보
 * @returns API 응답
 */
export const sendDetection = async (
  loginInfo: LoginInfo,
  detectionInfo: DetectionInfo
): Promise<BluetoothRegistryResponse> => {
  try {
    const response = await axios.post<BluetoothRegistryResponse>(`${BASE_URL}/detected`, {
      loginInfo,
      request: detectionInfo,
    });
    return response.data;
  } catch (error) {
    console.error('블루투스 기기 발견 정보 전송 오류:', error);
    throw error;
  }
};
