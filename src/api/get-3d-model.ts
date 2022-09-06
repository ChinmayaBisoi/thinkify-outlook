export default async function get3dmodel({
  modelName,
}: {
  modelName: string;
}): Promise<HealthLockerStatusResponse> {
  try {
    const myHeaders = new Headers();

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: myHeaders,
      mode: "cors",
    };

    const response = await fetch(
      `${ndhm}/v1/phr/health-locker?hid=${hid}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data || {};
  } catch (error) {}
  return {} as HealthLockerStatusResponse;
}
type HealthLockerStatusResponse = {
  status: "NotFound" | "Processed" | "Processing" | "Errored";
};
