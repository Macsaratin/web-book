package com.backend.bookwed.payloads;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor


public class AddressReponse {
    private List<AddressDTO> addressed;
}
