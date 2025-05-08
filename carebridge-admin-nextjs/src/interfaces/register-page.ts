export interface RegisterPageProps {
    formStateValue: any;
    setFormStateValue: any;
    activeStep: number;
    setActiveStep: (step: number) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleSkip: () => void;
    handleReset: () => void;
}