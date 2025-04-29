"use client";
import AppLogo from "@/components/app_logo";
import { AppTextField } from "@/themes/mui_components/app_text_field";


export default async function VerificationPage({ params: searchParams }: { params?: Promise<{ otp: string }> }) {
    await searchParams;
    return (
        <>
            <div className="flex flex-col gap-2 mb-10">
                <AppLogo size="large" />
                <p>Verification</p>
            </div>
            <div className="flex flex-row justify-between gap-3">
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
                <AppTextField
                    variant="outlined"
                    sizes="small"
                    type="text"
                    label="Enter OTP"
                    helperText="Enter the OTP sent to your email"
                    isRequired
                    value={""}
                    onChange={(e) => { }}
                />
            </div>
        </>
    );
}

/* 

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
}



*/