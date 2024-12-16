import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useImageProcessing = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '' });

  const getMimeType = (uri: string): string => {
    const extension = uri.split('.').pop()?.toLowerCase() || '';
    return extension === 'png' ? 'image/png' : 'image/jpeg';
  };

  const handleAlert = useCallback((message: string) => {
    setAlert({ visible: true, message });
    setIsLoading(false);
  }, []);

  const handleAlertClose = useCallback(() => {
    setAlert({ visible: false, message: '' });
    navigation.navigate('MainTab' as never);
  }, []);

  const uploadImage = useCallback(
    async (
      apiEndpoint: string,
      imageUri: string,
      formName: string,
      additionalParams: Record<string, string> = {},
      onSuccess: (data: any) => void
    ) => {
      const mimeType = getMimeType(imageUri);
      const formData = new FormData();
      formData.append(formName, {
        uri: imageUri,
        type: mimeType,
        name: `photo.${mimeType === 'image/png' ? 'png' : 'jpeg'}`,
      });
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams(additionalParams).toString();
        const response = await fetch(`${apiEndpoint}?${queryParams}`, {
          method: 'POST',
          body: formData,
        });
        console.log("서버 응답:", response);
        if (response.ok) {
          onSuccess(response);
          setIsLoading(false);
        } else {
          const errorText = await response.text();
          console.log("서버 오류:", errorText);
          if (errorText.includes("PetType")) {
            handleAlert(`판별 결과 선택한 종이 아닌 것으로 보입니다.\n다시 시도해주세요.`);
          } else if (errorText.includes("이미 등록된 비문입니다")) {
            handleAlert(`이미 등록된 비문입니다.\n새로운 비문 이미지를 선택해주세요.`);
          } else if (errorText.includes("코가 인식되지 않았습니다")) {
            handleAlert(`이미지에서 코가 인식되지 않았습니다.\n다시 시도해주세요.`);
          } else {
            console.log(`서버 오류 발생: ${errorText}`)
            handleAlert(`오류가 발생했습니다.\n다시 한번 시도해주세요.`);
          }
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Network error:', error);
        handleAlert('네트워크 오류가 발생했습니다.\n인터넷 상태를 점검해주세요.');
        setIsLoading(true);
      }
    },
    [getMimeType, handleAlert]
  );

  return { isLoading, handleAlert, uploadImage };
};
