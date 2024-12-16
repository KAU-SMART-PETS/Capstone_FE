import { ImageSourcePropType } from "react-native";

// 타입 정의
export interface CorrectExample {
    source: ImageSourcePropType;
}

export interface IncorrectExample {
    source: ImageSourcePropType;
    description: string;
}

export interface Examples {
    correct: CorrectExample[];
    incorrect: IncorrectExample[];
}

export interface Instruction {
    header: string;
    body: string;
    examples: Examples;
}

export interface ScanTypeConfig {
    key: string;
    title: string;
    selectIntro: string;
    instruction: Instruction;
    apiEndpoint: string;
}

const SCAN_TYPES: { [key: string]: ScanTypeConfig } = {
    EYE_SCAN: {
        key: 'EYE_SCAN',
        title: '안구 스캔',
        selectIntro : '촬영 시\n반려동물의 안구가\n잘 보일 수 있도록 찍어주세요.',
        instruction: {
            header: '안구가 잘 보이도록\n눈을 크게 뜬 사진을 준비해주세요.',
            body: '준비된 사진이 적합하지 않으면 분석에 실패할 확률이 높습니다.',
            examples: {
                correct: [
                    { source: require('@image/example1.png') },
                    { source: require('@image/example2.png') },
                    { source: require('@image/example3.png') },
                ],
                incorrect: [
                    { source: require('@image/example4.png'), description: '안구의 크기가\n너무 작아요.' },
                    { source: require('@image/example5.png'), description: '안구의 전부가\n보이지 않아요.' },
                ],
            },
        },
        apiEndpoint: 'http://52.79.140.133:8080/api/v1/ai/eye',
    },
    NOSE_REGISTER: {
        key: 'NOSE_REGISTER',
        title: '비문 등록',
        selectIntro : '비문 등록을 위한 반려동물을 선택해주세요.',
        instruction: {
            header: '코의 전체 모양이\n잘 보이는 사진을 준비해주세요.',
            body: '준비된 사진이 적합하지 않으면 비문 조회에 어려움을 겪을 수 있습니다.',
            examples: {
                correct: [
                    { source: require('@image/nose_example1.png') },
                    { source: require('@image/nose_example2.png') },
                    { source: require('@image/nose_example3.png') },
                ],
                incorrect: [
                    { source: require('@image/nose_example5.png'), description: '코의 모양이\n너무 작아요.' },
                    { source: require('@image/nose_example4.png'), description: '코의 전체가\n보이지 않아요.' },
                ],
            },
        },
        apiEndpoint: 'http://52.79.140.133:8080/api/v1/ai/nose/regist',
    },
    NOSE_SCAN: {
        key: 'NOSE_SCAN',
        title: '비문 조회',
        selectIntro : '비문 조회를 위한 반려동물을 선택해주세요.',
        instruction: {
            header: '코의 전체 모양이\n잘 보이는 사진을 준비해주세요.',
            body: '준비된 사진이 적합하지 않으면 비문 조회에 어려움을 겪을 수 있습니다.',
            examples: {
                correct: [
                    { source: require('@image/nose_example1.png') },
                    { source: require('@image/nose_example2.png') },
                    { source: require('@image/nose_example3.png') },
                ],
                incorrect: [
                    { source: require('@image/nose_example5.png'), description: '코의 모양이\n너무 작아요.' },
                    { source: require('@image/nose_example4.png'), description: '코의 전체가\n보이지 않아요.' },
                ],
            },
        },
        apiEndpoint: 'http://52.79.140.133:8080/api/v1/ai/nose/test',
    },

};

export default SCAN_TYPES;
