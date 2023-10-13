// 'use client';

// import * as z from 'zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import * as React from 'react';
// import { cn } from '@/lib/utils';
// import { useForm } from 'react-hook-form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Icons } from '@/components/shared/icon';
// import { toast } from '@/components/ui/use-toast';
// import { zodResolver } from '@hookform/resolvers/zod';
// // import { Link } from "react-router-dom";
// import images from '@/assets/images';

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// const userAuthFormSchema = z.object({
//   email: z
//     .string({
//       required_error: 'Email address is required',
//     })
//     .email({
//       message: 'Email address is not correct',
//     }),
// });

// type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;

// export function UserAuthFormForgotPassword({ className, ...props }: UserAuthFormProps) {
//   // const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   // const form = useForm<UserAuthFormValues>({
//   //   resolver: zodResolver(userAuthFormSchema),
//   // });

//   // const onSubmit = (data: UserAuthFormValues) => {
//   //   setIsLoading(true);

//   //   setTimeout(() => {
//   //     setIsLoading(false);
//   //   }, 3000);
//   //   toast({
//   //     title: 'You submitted the following values:',
//   //     description: (
//   //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//   //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//   //       </pre>
//   //     ),
//   //   });
//   // };

//   // return (
//   //   <div
//   //     className={cn('grid gap-6', className)}
//   //     {...props}
//   //     style={{
//   //       display: 'grid',
//   //       gap: '1.5rem',
//   //     }}
//   //   >
//   //     <Form {...form}>
//   //       <form
//   //         onSubmit={form.handleSubmit(onSubmit)}
//   //         className="space-y-4"
//   //         style={{
//   //           marginTop: '1rem',
//   //           marginBottom: '1rem',
//   //         }}
//   //       >
//   //         <FormField
//   //           control={form.control}
//   //           name="email"
//   //           render={({ field }) => (
//   //             <FormItem>
//   //               <FormLabel
//   //                 style={{
//   //                   display: 'block',
//   //                   fontSize: '16px',
//   //                   fontWeight: 'bold',
//   //                   marginBottom: '8px',
//   //                 }}
//   //               >
//   //                 EMAIL ADDRESS
//   //               </FormLabel>
//   //               <FormControl
//   //                 style={{
//   //                   marginBottom: '16px',
//   //                 }}
//   //               >
//   //                 <Input
//   //                   style={{
//   //                     width: '100%',
//   //                     padding: '8px',
//   //                     borderRadius: '4px',
//   //                     border: '2px solid #E02A0C',
//   //                     fontSize: '14px',
//   //                   }}
//   //                   placeholder="example@gmail.com"
//   //                   {...field}
//   //                 />
//   //               </FormControl>
//   //               <FormMessage
//   //                 style={{
//   //                   width: '100%',
//   //                   fontSize: '14px',
//   //                   marginBottom: '20px',
//   //                   color: 'red',
//   //                 }}
//   //               />
//   //             </FormItem>
//   //           )}
//   //         />

//   //         <Button
//   //           className="w-full bg-black"
//   //           disabled={isLoading}
//   //           style={{
//   //             color: '#EEEEEE',
//   //             backgroundColor: '#E02A0C',
//   //             borderRadius: '5px',
//   //             width: '100%',
//   //             margin: '0 auto',
//   //             display: 'flex',
//   //             paddingBottom: '10px',
//   //             paddingTop: '10px',
//   //             paddingLeft: '100px',
//   //             paddingRight: '10px',
//   //             alignItems: 'center',
//   //             textAlign: 'center',
//   //             fontWeight: 'bold',
//   //           }}
//   //         >
//   //           {isLoading && (
//   //             <Icons.spinner
//   //               className="mr-2 h-4 w-4 animate-spin"
//   //               style={{
//   //                 marginRight: '0.5rem',
//   //                 height: '1rem',
//   //                 width: '1rem',
//   //                 fontWeight: 'bold',
//   //                 animation: 'spin 1s linear infinite',
//   //               }}
//   //             />
//   //           )}
//   //           {''}
//   //           Forgot Password !
//   //         </Button>
//   //       </form>
//   //     </Form>
//   //     <div
//   //       className="relative"
//   //       style={{
//   //         position: 'relative',
//   //       }}
//   //     >
//   //       <div
//   //         className="absolute inset-0 flex items-center"
//   //         style={{
//   //           position: 'absolute',
//   //           top: 0,
//   //           right: 0,
//   //           bottom: 0,
//   //           left: 0,
//   //           display: 'flex',
//   //           alignItems: 'center',
//   //         }}
//   //       >
//   //         <span
//   //           className="w-full border-t"
//   //           style={{
//   //             width: '100%',
//   //             borderTop: '1px solid',
//   //           }}
//   //         />
//   //       </div>
//   //       <div
//   //         className="relative flex justify-center text-xs uppercase"
//   //         style={{
//   //           position: 'relative',
//   //           display: 'flex',
//   //           justifyContent: 'center',
//   //           fontSize: '1rem',
//   //           textTransform: 'uppercase',
//   //           fontWeight: 'bold',
//   //         }}
//   //       >
//   //         <span
//   //           className="bg-background px-2 text-muted-foreground"
//   //           style={{
//   //             backgroundColor: '#EEEEEE',
//   //             paddingLeft: '0.5rem',
//   //             paddingRight: '0.5rem',
//   //             color: 'black',
//   //           }}
//   //         >
//   //           Or continue with
//   //         </span>
//   //       </div>
//   //     </div>
//   //     <Button
//   //       variant="outline"
//   //       className="text-[#2B3674]"
//   //       type="button"
//   //       style={{
//   //         color: '#EEEEEE',
//   //         backgroundColor: '#E02A0C',
//   //         borderRadius: '10px',
//   //         width: '100%',
//   //         margin: '0 auto',
//   //         paddingBottom: '10px',
//   //         paddingTop: '10px',
//   //         display: 'flex',
//   //         alignItems: 'center',
//   //         fontWeight: 'bold',
//   //       }}
//   //       onClick={() => {
//   //         fetch('http://localhost:8000/api/google-auth', {
//   //           headers: new Headers({ accept: 'application/json' }),
//   //         })
//   //           .then(response => {
//   //             if (response.ok) {
//   //               return response.json();
//   //             }
//   //             throw new Error('Something went wrong!');
//   //           })
//   //           .then(({ url }) => window.open(url));
//   //       }}
//   //       disabled={isLoading}
//   //     >
//   //       {isLoading ? (
//   //         <img
//   //           src={images.iconGoogle}
//   //           alt="icon"
//   //           style={{
//   //             width: '25px',
//   //             marginRight: '10px',
//   //             marginLeft: '80px',
//   //           }}
//   //         />
//   //       ) : (
//   //         <img
//   //           src={images.iconGoogle}
//   //           alt="icon"
//   //           style={{
//   //             width: '25px',
//   //             marginRight: '10px',
//   //             marginLeft: '80px',
//   //           }}
//   //         />
//   //       )}
//   //       {''}
//   //       Sign in with Google !
//   //     </Button>
//   //   </div>
//   // );
// }
