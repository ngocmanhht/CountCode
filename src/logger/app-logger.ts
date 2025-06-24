class AppLogger {
  log(message: String, val?: unknown): void {
    console.log(`========[AppLogger]${message}=======`);
    console.log(val);
    console.log(`==========================`);
  }
}

export const appLogger = new AppLogger();
//  const processAlertsSequentially = async (values: string[]) => {
//     for (const value of values) {
//       const isDuplicate = value.startsWith('duplicate:');
//       const raw = isDuplicate ? value.replace('duplicate:', '') : value;

//       toast.showSuccess(
//         isDuplicate ? `${raw} đã được quét trước đó` : `Đã quét: ${raw}`,
//       );

//       if (!isDuplicate) {
//         scannedValueShared.value = [...scannedValueShared.value, raw];
//       }
//       await AppUtils.delay(1000);
//     }

//     isHandlingData.value = false;
//   };
