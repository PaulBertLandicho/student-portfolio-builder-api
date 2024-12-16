import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import '../../../../css/auth.css';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        contact: user.contact,
        gender: user.gender,
        image: null,
    });

    const [profileImage, setProfileImage] = useState(user.image ? `/images/profile/${user.image}` : '/images/default.png');

    const submitProfileInfo = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            setProfileImage(URL.createObjectURL(file));
        } else {
            alert('Please upload a valid image.');
        }
    };

    const submitProfileImage = (e) => {
        e.preventDefault();
        if (!data.image) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', data.image);

        axios
            .post(route('profile.image.upload'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                alert(response.data.message);
                setProfileImage(`/images/profile/${response.data.image}`);
                setData('image', null); // Clear image after upload
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to upload the image.');
            });
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setData('image', null); // clear the file input after successful update
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                   You can update your account's profile information.
                </p>
            </header>

            <div className="forms">
                        
                        <input type="file" id="profilePicture" name="image" accept="image/*" onChange={handleFileChange}
                          style= {{ display: "none" }} />                    </div>
                              <div className="profile-picture">
                              <img id="avatar" src={profileImage} alt="Profile"  onClick={() => document.getElementById('profilePicture').click()} />
                                                <label htmlFor="profilePicture">
                                      
                                  </label>
           <button onClick={submitProfileImage} className="mt-2 btn btn-primary">
                              Change Profile
                          </button>
                      </div>
            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                
                 {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Fullname */}
                <div>
                    <InputLabel htmlFor="fullname" value="Fullname" />
                    <TextInput
                        id="fullname"
                        className="mt-1 block w-full"
                        value={data.fullname}
                        onChange={(e) => setData('fullname', e.target.value)}
                        required
                        autoComplete="fullname"
                    />
                    <InputError className="mt-2" message={errors.fullname} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Address */}
                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                        autoComplete="address"
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                {/* Contact */}
                <div>
                    <InputLabel htmlFor="contact" value="Contact" />
                    <TextInput
                        id="contact"
                        className="mt-1 block w-full"
                        value={data.contact}
                        onChange={(e) => setData('contact', e.target.value)}
                        required
                        autoComplete="contact"
                    />
                    <InputError className="mt-2" message={errors.contact} />
                </div>

                {/* Gender */}
                <div>
                    <InputLabel htmlFor="gender" value="Gender" />
                    <select
                        id="gender"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <InputError className="mt-2" message={errors.gender} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
